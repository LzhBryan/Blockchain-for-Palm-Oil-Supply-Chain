import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import axios from "../utils/axios"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const WeeklyRecordsChart = () => {
  const [weeklyRecords, setWeeklyRecords] = useState([])
  const [weeklyTransactions, setWeeklyTransactions] = useState([])

  const fetchWeeklyRecords = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/weeklyRecords")
      setWeeklyRecords(data.weeklyRecords)
    } catch (error) {
      console.log(error.response)
    }
  }

  const fetchWeeklyTransaction = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/weeklyTransactions")
      setWeeklyTransactions(data.weeklyTransactions)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchWeeklyRecords()
    fetchWeeklyTransaction()
  }, [])

  return (
    <Line
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
            label: "Transactions",
            data: weeklyTransactions,
            backgroundColor: ["#1CCAB8"],
            borderColor: ["#1CCAB8"],
            borderWidth: 1,
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 10,
          },
          {
            label: "Supply-chain records",
            data: weeklyRecords,
            backgroundColor: ["#377DE4"],
            borderColor: ["#377DE4"],
            borderWidth: 1,
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 10,
          },
        ],
      }}
      width={600}
      height={300}
      options={{
        maintainAspectRatio: false,
        responsive: true,
      }}
    />
  )
}

export default WeeklyRecordsChart
