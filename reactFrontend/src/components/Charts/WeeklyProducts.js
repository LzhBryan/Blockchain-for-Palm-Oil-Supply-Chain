import React from "react"
import { Bar } from "react-chartjs-2"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js"
import { useFetch } from "../../utils/useFetch"

ChartJS.register(BarElement, CategoryScale, LinearScale)

const WeeklyProducts = () => {
  const { data } = useFetch("/api/dashboard/weeklyProducts")

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
            label: "Products",
            data: data?.weeklyProducts,
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      }}
      width={600}
      height={300}
      options={{
        maintainAspectRatio: false,
      }}
    />
  )
}

export default WeeklyProducts
