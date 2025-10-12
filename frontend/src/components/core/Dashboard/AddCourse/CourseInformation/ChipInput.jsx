import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { GrFormClose } from "react-icons/gr"

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const { course, editCourse } = useSelector((state) => state.course)
  const [chips, setChips] = useState([])

  // 🧠 Initialize chips if editing a course
  useEffect(() => {
    if (editCourse) {
      try {
        let parsedTags = []

        // ✅ Case 1: tags already array (recommended backend format)
        if (Array.isArray(course?.tags)) {
          parsedTags = course.tags
        }
        // ✅ Case 2: tags are stored as JSON string
        else if (course?.tags && course.tags !== "undefined") {
          parsedTags = JSON.parse(course.tags)
        }

        setChips(parsedTags)
      } catch (err) {
        console.error("Failed to parse course tags:", err)
        setChips([])
      }
    }

    // Register field with validation
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  // 🧩 Update form value whenever chips change
  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  // ➕ Handle adding new chips
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const chipValue = e.target.value.trim()

      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue])
        e.target.value = ""
      }
    }
  }

  // ❌ Handle deleting a chip
  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, ind) => ind !== chipIndex)
    setChips(newChips)
  }

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Chips + Input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Render existing chips */}
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <GrFormClose className="text-sm" />
            </button>
          </div>
        ))}

        {/* Input for new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>

      {/* Validation error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default ChipInput
