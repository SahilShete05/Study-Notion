const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const mailSender = require("./utils/mailSender");

// Set PORT
const PORT = process.env.PORT || 4000;

// Database connection
database.connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

//  Dynamic CORS setup — works for all Vercel URLs + localhost
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) //  Allow all your Vercel deployments
      ) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Extra headers for safety
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (
    allowedOrigins.includes(origin) ||
    (origin && /\.vercel\.app$/.test(origin))
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Handle preflight requests globally
app.options("*", cors({
  origin: function (origin, callback) {
    if (!origin || /\.vercel\.app$/.test(origin) || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Test CORS route
app.get("/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working correctly!",
    origin: req.headers.origin,
  });
});

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Test email route 
if (process.env.NODE_ENV !== "production") {
  app.get("/test-email", async (req, res) => {
    try {
      const response = await mailSender(
        "shete1333@gmail.com",
        "StudyNotion Test Email",
        "<h2>This is a test email from StudyNotion backend </h2>"
      );
      return res.json({ success: true, message: "Email sent successfully!", response });
    } catch (error) {
      console.error(" Error sending test email:", error);
      return res.status(500).json({ success: false, message: "Failed to send email", error });
    }
  });
}

// Start server
app.listen(PORT, () => {
  console.log(` App is running at port ${PORT}`);
});
