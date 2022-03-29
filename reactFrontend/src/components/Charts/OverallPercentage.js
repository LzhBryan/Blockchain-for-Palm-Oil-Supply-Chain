import React, { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from "chart.js"
import axios from "../../utils/axios"

ChartJS.register(ArcElement, Tooltip, Legend)

const OverallPercentage = () => {
  const [percentage, setPercentage] = useState({})

  const fetchPercentage = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/approveReject")
      setPercentage(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchPercentage()
  }, [])

  return (
    <Doughnut
      data={{
        labels: ["Approved", "Rejected"],
        datasets: [
          {
            label: "Approved Reject percentage",
            data: [percentage.approvedTotal, percentage.rejectedTotal],
            backgroundColor: ["#21B783", "#EF4D56"],
            borderColor: ["#21B783", "#EF4D56"],
            borderWidth: 1,
            hoverOffset: 7,
          },
        ],
      }}
      width={300}
      height={310}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontSize: 25,
          },
        },
      }}
    />
  )
}

export default OverallPercentage
