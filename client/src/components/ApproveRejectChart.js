import React from "react"
import { Doughnut } from "react-chartjs-2"
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from "chart.js"
import { useFetch } from "../utils/useFetch"

ChartJS.register(ArcElement, Tooltip, Legend)

const ApproveRejectChart = () => {
  const { data } = useFetch("/api/dashboard/approveReject")

  return (
    <Doughnut
      data={{
        labels: ["Approved", "Rejected"],
        datasets: [
          {
            label: "Approved Reject percentage",
            data: [data?.approvedTotal, data?.rejectedTotal],
            backgroundColor: ["#0B9A8D", "#EF4D56"],
            borderColor: ["#0B9A8D", "#EF4D56"],
            borderWidth: 1,
            hoverOffset: 7,
          },
        ],
      }}
      width={300}
      height={310}
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 20,
          },
        },
        legend: {
          labels: {
            fontSize: 25,
          },
        },
      }}
    />
  )
}

export default ApproveRejectChart
