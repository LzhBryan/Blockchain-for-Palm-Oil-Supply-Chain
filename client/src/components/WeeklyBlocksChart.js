import React from "react"
import { Bar } from "react-chartjs-2"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js"
import { useFetch } from "../utils/useFetch"

ChartJS.register(BarElement, CategoryScale, LinearScale)

const WeeklyBlocksChart = () => {
  const { data } = useFetch("/api/dashboard/weeklyBlocks")

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
            data: data?.weeklyBlocks,
            backgroundColor: ["#77C2FE"],
            borderColor: ["#77C2FE"],
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

export default WeeklyBlocksChart
