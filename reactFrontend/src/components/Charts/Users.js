import React, { useState, useEffect } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import axios from "../../utils/axios"

ChartJS.register(ArcElement, Tooltip, Legend)

const Users = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/dashboard/users")
      setUsers(data.users)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Pie
      data={{
        labels: [
          "Planter",
          "Miller",
          "Refiner",
          "WarehouseManager",
          "Retailer",
          "Validator",
        ],
        datasets: [{ data: users }],
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
