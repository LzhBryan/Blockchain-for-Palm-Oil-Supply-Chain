import axios from "axios"

const baseURL = "http://localhost:5000"
let headers = {}

if (localStorage.getItem("authToken")) {
  headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`
}

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: headers,
})

export default axiosInstance
