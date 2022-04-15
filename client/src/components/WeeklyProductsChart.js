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

const WeeklyProductsChart = () => {
  const { data } = useFetch("/api/dashboard/weeklyProducts")

  const palmOil = data?.weeklyProducts.map((product) => product.palmOil)
  const palmKernelOil = data?.weeklyProducts.map(
    (product) => product.palmKernelOil
  )
  const biofuel = data?.weeklyProducts.map((product) => product.biofuel)

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
            label: "Palm Oil",
            data: palmOil,
            backgroundColor: ["#176BA0"],
            borderColor: ["#176BA0"],
            borderWidth: 1,
          },
          {
            label: "Palm Kernel Oil",
            data: palmKernelOil,
            backgroundColor: ["#1AC9E6"],
            borderColor: ["#1AC9E6"],
            borderWidth: 1,
          },
          {
            label: "Biofuel",
            data: biofuel,
            backgroundColor: ["#1DE4BE"],
            borderColor: ["#1DE4BE"],
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

export default WeeklyProductsChart
