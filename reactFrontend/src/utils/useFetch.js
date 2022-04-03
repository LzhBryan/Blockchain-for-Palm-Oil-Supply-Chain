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
      setData(blockData)
      setIsLoading(false)
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
