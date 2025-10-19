const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const { otpTemplate} = require("../mail/templates/emailVerificationTemplate")
require("dotenv").config();



exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(" Email in sendOtp controller:", email);

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "Email already exists",
      });
    }

    //  Generate a unique 6-digit OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let existingOtp = await OTP.findOne({ otp });
    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOtp = await OTP.findOne({ otp });
    }

    console.log(" OTP generated:", otp);

    //  Save OTP to DB
    const createdOtp = await OTP.create({ email, otp });

    //  Send OTP email via Gmail
    const mailResponse = await mailSender(
      email,
      "StudyNotion | Email Verification Code",
      otpTemplate(otp)
    );

    if (!mailResponse) {
      console.log(" Email not sent via Gmail");
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
    }

    console.log(" OTP email sent successfully to:", email);

    //  Send response
    return res.status(200).json({
      success: true,
      message: "OTP created and sent successfully!",
      createdOtp,
    });
  } catch (error) {
    console.error(" sendOtp error:", error);
    return res.status(500).json({
      success: false,
      message: "Error generating OTP",
      error: error.message,
    });
  }
};


//  SIGN UP

exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Please fill all required details",
      });
    }

    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Verify OTP
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(" OTP found for signup:", recentOtp[0]?.otp);

    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create default profile
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPwd,
      accountType,
      approved: accountType === "Instructor" ? false : true,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    console.log(" New user registered:", email);
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error(" signUp error:", error);
    return res.status(500).json({
      success: false,
      message: "User registration failed, please try again",
    });
  }
};


//  LOGIN

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or password is missing",
      });
    }

    const existingUser = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email not registered",
      });
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const payload = {
        email: email,
        accountType: existingUser.accountType,
        id: existingUser._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      existingUser.token = token;
      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Login successful",
        token,
        existingUser,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.error(" login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed, please try again",
    });
  }
};


//  CHANGE PASSWORD

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send confirmation email via Gmail
    try {
      await mailSender(
        updatedUserDetails.email,
        "StudyNotion | Password Updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log(" Gmail SMTP: Password update email sent to", updatedUserDetails.email);
    } catch (error) {
      console.error(" Error sending password update email:", error.message);
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(" changePassword error:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
    });
  }
};
