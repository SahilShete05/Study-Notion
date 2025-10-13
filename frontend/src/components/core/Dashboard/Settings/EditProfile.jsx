import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitProfileForm)}
      className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 text-richblack-5"
    >
      {/* Profile Information Section */}
      <div className="my-6 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 md:p-10">
        <h2 className="text-lg sm:text-xl font-semibold text-richblack-5">
          Profile Information
        </h2>

        {/* Name Fields */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* First Name */}
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label htmlFor="firstName" className="text-sm font-medium text-richblack-100">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter first name"
              className="form-style"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <span className="text-[12px] text-yellow-100">
                Please enter your first name.
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label htmlFor="lastName" className="text-sm font-medium text-richblack-100">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter last name"
              className="form-style"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
              <span className="text-[12px] text-yellow-100">
                Please enter your last name.
              </span>
            )}
          </div>
        </div>

        {/* DOB and Gender */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label htmlFor="dateOfBirth" className="text-sm font-medium text-richblack-100">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              className="form-style"
              {...register("dateOfBirth", {
                required: "Please enter your Date of Birth.",
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <span className="text-[12px] text-yellow-100">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label htmlFor="gender" className="text-sm font-medium text-richblack-100">
              Gender
            </label>
            <select
              id="gender"
              className="form-style"
              {...register("gender", { required: true })}
              defaultValue={user?.additionalDetails?.gender}
            >
              {genders.map((ele, i) => (
                <option key={i} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="text-[12px] text-yellow-100">
                Please select your gender.
              </span>
            )}
          </div>
        </div>

        {/* Contact and About */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label htmlFor="contactNumber" className="text-sm font-medium text-richblack-100">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="Enter contact number"
              className="form-style"
              {...register("contactNumber", {
                required: "Please enter your contact number.",
                maxLength: { value: 12, message: "Invalid contact number." },
                minLength: { value: 10, message: "Invalid contact number." },
              })}
              defaultValue={user?.additionalDetails?.contactNumber}
            />
            {errors.contactNumber && (
              <span className="text-[12px] text-yellow-100">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full lg:w-1/2">
            <label htmlFor="about" className="text-sm font-medium text-richblack-100">
              About
            </label>
            <input
              type="text"
              id="about"
              placeholder="Enter bio details"
              className="form-style"
              {...register("about", { required: true })}
              defaultValue={user?.additionalDetails?.about}
            />
            {errors.about && (
              <span className="text-[12px] text-yellow-100">
                Please enter something about yourself.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-richblack-700 py-2 px-5 text-sm font-semibold text-richblack-50 hover:bg-richblack-600 transition-all"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save"/>
      </div>
    </form>
  )
}
