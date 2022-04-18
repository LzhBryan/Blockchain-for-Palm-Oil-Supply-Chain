import axios from "axios"
import Swal from "sweetalert2"

const baseURL = "http://localhost:5000"

const axiosInstance = axios.create({
  baseURL: baseURL,
})

axiosInstance.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("authToken")) {
      request.headers.Authorization = `Bearer ${localStorage.getItem(
        "authToken"
      )}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const response = await Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: "Session Expired",
        icon: "warning",
        text: "Your token has expired. Please login again to refresh the token",
      })
      if (response.isConfirmed) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("role")
        window.location = "/"
      }
    } else if (error.response.status === 403) {
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: "Unauthorized role",
        icon: "error",
        text: "Your role is not allowed to access this route",
      })
    } else if (error.response.status === 404 && !error.response.data.msg) {
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: "Error 404",
        icon: "error",
        text: "Route does not exist",
      })
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosInstance
