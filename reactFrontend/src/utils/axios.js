import axios from "axios"

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

export default axiosInstance
