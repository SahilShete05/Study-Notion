import React from 'react'
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 text-white">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] overflow-hidden bg-richblack-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Scrollable main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
