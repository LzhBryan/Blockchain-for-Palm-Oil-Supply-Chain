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

const WeeklyProducts = () => {
  const [weeklyProducts, setWeeklyProducts] = useState([])

  const fetchWeeklyProducts = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/weeklyProducts")
      setWeeklyProducts(data.products)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchWeeklyProducts()
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
            label: "Products",
            data: weeklyProducts,
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
