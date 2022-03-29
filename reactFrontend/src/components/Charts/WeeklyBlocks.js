import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js"
import axios from "../../utils/axios"

ChartJS.register(BarElement, CategoryScale, LinearScale)

const WeeklyBlocks = () => {
  const [weeklyBlocks, setWeeklyBlocks] = useState([])

  const fetchWeeklyBlocks = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/weeklyBlocks")
      setWeeklyBlocks(data.weeklyBlocks)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchWeeklyBlocks()
  }, [])

  return (
    <Bar
      data={{
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Blocks",
            data: weeklyBlocks,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      }}
      width={600}
      height={337}
      options={{
        maintainAspectRatio: false,
      }}
    />
  )
}

export default WeeklyBlocks
