import React from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { useFetch } from "../../utils/useFetch"

ChartJS.register(ArcElement, Tooltip, Legend)

const Users = () => {
  const { data } = useFetch("/api/dashboard/users")

  return (
    <Pie
      data={{
        labels: [
          "Planter",
          "Miller",
          "Refiner",
          "Warehouse Manager",
          "Retailer",
          "Validator",
        ],
        datasets: [
          {
            data: data?.users,
            backgroundColor: [
              "#49C7EC",
              "#4C79F6",
              "#E0E7FD",
              "#FF5DA0",
              "#6978C9",
              "#62BEB6",
            ],
          },
        ],
      }}
      width={300}
      height={310}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      }}
    />
  )
}

export default Users
