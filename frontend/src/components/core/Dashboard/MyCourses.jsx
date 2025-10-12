import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Prevent multiple fetches
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && token) {
      hasFetched.current = true;

      const fetchCourses = async () => {
        setLoading(true);
        const result = await fetchInstructorCourses(token);
        if (result) setCourses(result);
        setLoading(false);
      };

      fetchCourses();
    }
  }, [token]);

  //  Show spinner during loading
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-10">
        <div className="spinner" /> 
      </div>
    );
  }

  //  Main content after loading finishes
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>

      {courses.length > 0 ? (
        <CoursesTable courses={courses} setCourses={setCourses} />
      ) : (
        <p className="text-richblack-200">No courses available.</p>
      )}
    </div>
  );
};

export default MyCourses;
