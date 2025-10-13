import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GrFormClose } from "react-icons/gr";

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const { course, editCourse } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  //  Initialize tags when editing course
  useEffect(() => {
    if (editCourse) {
      try {
        let parsedTags = [];

        if (Array.isArray(course?.tag || course?.tags)) {
          parsedTags = course?.tag || course?.tags;
        } else if (typeof course?.tag === "string" && course.tag !== "undefined") {
          parsedTags = JSON.parse(course.tag);
        } else if (typeof course?.tags === "string" && course.tags !== "undefined") {
          parsedTags = JSON.parse(course.tags);
        }

        console.log(" [ChipInput] Loaded existing tags:", parsedTags);
        setChips(parsedTags);
      } catch (err) {
        console.error(" [ChipInput] Failed to parse course tags:", err);
        setChips([]);
      }
    }

    // Register field in react-hook-form
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  //  Sync chips with form state
  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  //  Add new chip
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const chipValue = e.target.value.trim();

      if (chipValue && !chips.includes(chipValue)) {
        const updatedChips = [...chips, chipValue];
        setChips(updatedChips);
        console.log(" [ChipInput] Added chip:", chipValue);
        e.target.value = "";
      } else if (chips.includes(chipValue)) {
        console.warn(" [ChipInput] Duplicate chip ignored:", chipValue);
      }
    }
  };

  //  Remove chip
  const handleDeleteChip = (index) => {
    const updatedChips = chips.filter((_, i) => i !== index);
    setChips(updatedChips);
    console.log(" [ChipInput] Removed chip:", chips[index]);
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {/* Label */}
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Chip Container */}
      <div
        className="
          flex flex-wrap items-center gap-2 rounded-md 
          border border-richblack-700 bg-richblack-800 p-2
          w-full
          sm:flex-row
        "
      >
        {/* Existing Chips */}
        {chips.map((chip, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between gap-1 
              rounded-full bg-yellow-400 px-3 py-1 
              text-sm font-medium text-richblack-900
              max-w-full
            "
          >
            <span className="truncate">{chip}</span>
            <button
              type="button"
              onClick={() => handleDeleteChip(index)}
              className="ml-1 text-richblack-900 hover:text-pink-700 transition-all"
            >
              <GrFormClose className="text-base" />
            </button>
          </div>
        ))}

        {/* Input Field */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="
            flex-1 min-w-[120px] bg-transparent 
            px-2 py-1 text-richblack-5 placeholder:text-richblack-400 
            focus:outline-none 
            sm:min-w-[200px]
          "
        />
      </div>

      {/* Validation Error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default ChipInput;
