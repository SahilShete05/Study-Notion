import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import { HiUser, HiChartBar, HiBookOpen, HiPlusCircle } from "react-icons/hi";
import SidebarLink from "./SidebarLink";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r border-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r border-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={handleLogout}
            className="px-8 py-2 text-sm font-medium text-richblack-300 hover:text-yellow-50 transition-all"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-richblack-800 border-t border-richblack-700 flex justify-around py-2 z-50">
        {/* 1️⃣ My Profile */}
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="flex flex-col items-center text-richblack-200 hover:text-yellow-50"
        >
          <HiUser className="text-xl" />
          <span className="text-[10px] mt-1">Profile</span>
        </button>

        {/*  Statistics (Instructor only) */}
        {user?.accountType === "Instructor" && (
          <button
            onClick={() => navigate("/dashboard/instructor")}
            className="flex flex-col items-center text-richblack-200 hover:text-yellow-50"
          >
            <HiChartBar className="text-xl" />
            <span className="text-[10px] mt-1">Dashboard</span>
          </button>
        )}

        {/*  My Courses (Student only) */}
        {user?.accountType === "Student" && (
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex flex-col items-center text-richblack-200 hover:text-yellow-50"
          >
            <HiBookOpen className="text-xl" />
            <span className="text-[10px] mt-1">Courses</span>
          </button>
        )}

        {/*  Add Course (Instructor only) */}
        {user?.accountType === "Instructor" && (
          <button
            onClick={() => navigate("/dashboard/add-course")}
            className="flex flex-col items-center text-richblack-200 hover:text-yellow-50"
          >
            <HiPlusCircle className="text-xl" />
            <span className="text-[10px] mt-1">Add</span>
          </button>
        )}

        {/*  Settings (All users) */}
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex flex-col items-center text-richblack-200 hover:text-yellow-50"
        >
          <VscSettingsGear className="text-xl" />
          <span className="text-[10px] mt-1">Settings</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-richblack-200 hover:text-red-400"
        >
          <VscSignOut className="text-xl" />
          <span className="text-[10px] mt-1">Logout</span>
        </button>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
