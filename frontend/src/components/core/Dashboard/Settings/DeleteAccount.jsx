import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="my-10 flex flex-col sm:flex-row gap-5 rounded-md border border-pink-700 bg-pink-900 p-6 sm:p-8">
      {/* Trash Icon */}
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col space-y-3 text-center sm:text-left">
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>

        <div className="text-pink-25 sm:w-4/5 mx-auto sm:mx-0 text-sm sm:text-base leading-relaxed">
          <p>Would you like to delete your account?</p>
          <p>
            This account may contain paid courses. Deleting your account is
            permanent and will remove all content associated with it.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDeleteAccount}
          className="w-full sm:w-fit cursor-pointer italic text-pink-300 hover:text-pink-200 transition-colors duration-200"
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  )
}
