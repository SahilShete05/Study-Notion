import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementField = ({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) => {
  const { course, editCourse } = useSelector((state) => state.course);
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  // ✅ Initialize on mount
  useEffect(() => {
    if (editCourse && course?.instructions) {
      try {
        let parsedRequirements = [];

        // Handle both stringified and array formats safely
        if (Array.isArray(course.instructions)) {
          parsedRequirements = course.instructions;
        } else if (typeof course.instructions === "string") {
          parsedRequirements = JSON.parse(course.instructions);
        }

        setRequirementsList(parsedRequirements);
        console.log("✅ Loaded existing requirements:", parsedRequirements);
      } catch (err) {
        console.error("❌ Failed to parse course.instructions:", err);
        setRequirementsList([]);
      }
    }

    // Register field with validation
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  // ✅ Keep parent form synced with internal list
  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList]);

  // ➕ Add requirement safely
  const handleAddRequirement = () => {
    const trimmed = requirement.trim();
    if (trimmed.length > 0 && !requirementsList.includes(trimmed)) {
      const updated = [...requirementsList, trimmed];
      setRequirementsList(updated);
      setRequirement("");
      console.log("➕ Added requirement:", trimmed);
    }
  };

  // ❌ Remove requirement
  const handleRemoveRequirement = (index) => {
    const updated = requirementsList.filter((_, i) => i !== index);
    setRequirementsList(updated);
    console.log("❌ Removed requirement at index:", index, updated);
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Input + Add Button */}
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
          placeholder="Type a requirement and click Add"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {/* Requirements List */}
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((req, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{req}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default RequirementField;
