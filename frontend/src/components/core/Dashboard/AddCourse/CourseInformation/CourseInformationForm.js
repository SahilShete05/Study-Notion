import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementField";

const CourseInformationForm = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const data = await fetchCourseCategories();
      if (data?.length) setCategories(data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  // Prefill form when editing
  useEffect(() => {
    if (editCourse && course) {
      setValue("courseTitle", course.courseName || "");
      setValue("courseShortDesc", course.courseDescription || "");
      setValue("coursePrice", course.price || 0);
      setValue("courseTags", course.tag || []);
      setValue("courseBenefits", course.whatWillYouLearn || "");
      setValue("courseCategory", course.category?._id || "");
      setValue("courseRequirements", course.instructions || []);
      setValue("courseImage", course.thumbnail || null);
    }
  }, [editCourse, course, setValue]);

  // Check if any field was changed (only relevant in edit mode)
  const isFormUpdated = () => {
    const current = getValues();
    return (
      current.courseTitle !== course.courseName ||
      current.courseShortDesc !== course.courseDescription ||
      current.coursePrice !== course.price ||
      JSON.stringify(current.courseTags || []) !== JSON.stringify(course.tag || []) ||
      current.courseBenefits !== course.whatWillYouLearn ||
      (current.courseCategory || "") !== (course.category?._id || "") ||
      JSON.stringify(current.courseRequirements || []) !== JSON.stringify(course.instructions || []) ||
      current.courseImage !== course.thumbnail
    );
  };

  const onSubmit = async (data) => {
    try {
      const currentValues = getValues();
      const formData = new FormData();

      if (editCourse) {
        if (!isFormUpdated()) {
          toast.error("No changes made to the form");
          return;
        }
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName)
          formData.append("courseName", data.courseTitle.trim());
        if (currentValues.courseShortDesc !== course.courseDescription)
          formData.append("courseDescription", data.courseShortDesc.trim());
        if (currentValues.coursePrice !== course.price)
          formData.append("price", data.coursePrice);
        if (JSON.stringify(currentValues.courseTags || []) !== JSON.stringify(course.tag || []))
          formData.append("tag", JSON.stringify(data.courseTags));
        if (currentValues.courseBenefits !== course.whatWillYouLearn)
          formData.append("whatWillYouLearn", data.courseBenefits.trim());
        if ((currentValues.courseCategory || "") !== (course.category?._id || ""))
          formData.append("category", data.courseCategory);
        if (JSON.stringify(currentValues.courseRequirements || []) !== JSON.stringify(course.instructions || []))
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        if (currentValues.courseImage !== course.thumbnail)
          formData.append("thumbnailImage", data.courseImage);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        return;
      }

      // New course creation
      formData.append("courseName", data.courseTitle.trim());
      formData.append("courseDescription", data.courseShortDesc.trim());
      formData.append("price", data.coursePrice);
      formData.append("tag", JSON.stringify(data.courseTags));
      formData.append("whatWillYouLearn", data.courseBenefits.trim());
      formData.append("category", data.courseCategory);
      formData.append("status", COURSE_STATUS.DRAFT);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("thumbnailImage", data.courseImage);

      setLoading(true);
      const result = await addCourseDetails(formData, token);
      setLoading(false);

      if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
    } catch (error) {
      console.error("COURSE SUBMIT ERROR:", error);
      toast.error("Something went wrong while submitting the form");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs text-pink-200">Course title is required</span>
        )}
      </div>

      {/* Course Description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style min-h-[130px] resize-none w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs text-pink-200">Course Description is required</span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            type="number"
            placeholder="Enter Price"
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs text-pink-200">Course price is required</span>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="form-style w-full"
          disabled={loading}
        >
          <option value="" disabled>
            Choose a category
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs text-pink-200">Course category is required</span>
        )}
      </div>

      {/* Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press Enter"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      {/* Thumbnail Upload */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter course benefits"
          {...register("courseBenefits", { required: true })}
          className="form-style min-h-[130px] resize-none w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs text-pink-200">Benefits are required</span>
        )}
      </div>

      {/* Requirements */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="bg-richblack-300 px-4 py-2 rounded-md text-richblack-900 font-semibold"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn disabled={loading} text={editCourse ? "Save Changes" : "Next"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
