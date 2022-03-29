import { useState, useEffect } from "react"
import axios from "../utils/axios"

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [serverError, setServerError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(url)
      const blockData = await response?.data
      console.log(blockData)
      setTimeout(blockData, 0.0001)
      setData(blockData)
      setIsLoading(false)
      console.log(blockData)
    } catch (error) {
      console.log(error.response.data.msg)
      setServerError(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [url])

  return { data, isLoading, serverError }
}
