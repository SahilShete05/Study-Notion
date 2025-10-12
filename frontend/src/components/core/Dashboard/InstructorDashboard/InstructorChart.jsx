import { useState } from "react"
import { Pie } from "react-chartjs-2"
import { ArcElement, Chart, Tooltip, Legend } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend)

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students")

  const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#8BC34A", "#E91E63",
    "#00BCD4", "#CDDC39"
  ]

  // Student data
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: colors.slice(0, courses.length),
      },
    ],
  }

  // Income data
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: colors.slice(0, courses.length),
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff", 
        },
      },
    },
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>

      {/* Chart switch buttons */}
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      {/* Chart container with fixed size */}
      <div className="relative mx-auto h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
