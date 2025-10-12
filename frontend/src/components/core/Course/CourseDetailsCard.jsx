import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import { toast } from 'react-hot-toast'

import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slices/cartSlice'

import { BiSolidRightArrow } from 'react-icons/bi'

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const { thumbnail: ThumbnailImage, price: CurrentPrice, studentsEnrolled = [], instructions } = course

  // Safely parse instructions
  let parsedInstructions = []
  try {
    parsedInstructions = JSON.parse(instructions) || []
  } catch (err) {
    console.error('Invalid course instructions format')
  }

  //  Add to Cart Handler
  const handleAddToCart = () => {
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot purchase courses")
      return
    }

    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in",
        text2: "Please login to add to cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })
      return
    }

    const alreadyInCart = cart.some((item) => item._id === course._id)
    if (alreadyInCart) {
      toast.error("Course already in cart")
      return
    }

    dispatch(addToCart(course))
    toast.success("Course added to cart")
  }

  //  Copy Share Link
  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link Copied to Clipboard")
  }

  const isStudentEnrolled = user && studentsEnrolled.includes(user._id)

  return (
    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
      <img
        src={ThumbnailImage}
        alt='Course Thumbnail'
        className='max-h-[300px] min-h-[180px] w-full rounded-2xl object-cover md:max-w-full'
      />

      <div className='px-4'>
        {/* Price */}
        <div className='space-x-3 pb-4 text-3xl font-semibold'>
          Rs. {CurrentPrice}
        </div>

        {/* Buttons */}
        <div className='flex flex-col gap-y-6'>
          <button
            className='yellowButton'
            onClick={
              isStudentEnrolled
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {isStudentEnrolled ? "Go to Course" : "Buy Now"}
          </button>

          {!isStudentEnrolled && (
            <button onClick={handleAddToCart} className='blackButton'>
              Add to Cart
            </button>
          )}
        </div>

        {/* Guarantee */}
        <div>
          <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
            30-Day Money-Back Guarantee
          </p>
        </div>

        {/* Course Includes */}
        <div>
          <p className='my-2 text-xl font-semibold'>
            This Course Includes:
          </p>
          <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
            {parsedInstructions.map((item, index) => (
              <p key={index} className='flex gap-2 items-start'>
                <BiSolidRightArrow />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <div className='text-center'>
          <button
            className='mx-auto flex items-center gap-2 py-6 text-yellow-100'
            onClick={handleShare}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard
