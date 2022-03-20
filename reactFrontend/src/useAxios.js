import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.baseURL = "http://localhost:5000"

const useAxios = ({ url, method, headers = null, body = null }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState("")
  const [loading, setloading] = useState(true)

  const fetchData = async () => {
    try {
      setloading(true)
      const { data } = await axios[method](url, headers, body)
      setResponse(data)
    } catch (error) {
      setError(error.response)
    }
    setloading(false)
  }

  useEffect(() => {
    fetchData()
  }, [{ url }])

  return { response, error, loading, fetchData }
}

export default useAxios
