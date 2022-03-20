import axios from "axios"
import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import HibernatingBlock from "./HibernatingBlock"
import Swal from "sweetalert2"

const CreateBlocks = () => {
  const [blocks, setBlocks] = useState([])
  const [isActivated, setIsActivated] = useState(false)
  const [disabledActivate, setDisabledActivate] = useState(false)
  const [isValid, setIsValid] = useState(null)
  const [disabledValidate, setDisabledValidate] = useState(true)
  const [isApproved, setIsApproved] = useState(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const getBlocks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blocks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      setBlocks(response.data.waitingBlock)
      if (response.data.waitingBlock.status === "Hibernating") {
        setDisabledActivate(false)
        setDisabledValidate(true)
      } else if (response.data.waitingBlock.status === "Pending") {
        setDisabledActivate(true)
        setDisabledValidate(false)
      }
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const handleActivate = async () => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/blocks/${blocks._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      console.log(data)
      setBlocks(data.activateBlock)
      setDisabledActivate(true)
      setDisabledValidate(false)
      setIsActivated(true)
    } catch (error) {
      console.log(error.response.data.msg)
      setError(true)
    }
  }

  useEffect(() => {
    if (isActivated === false) {
      getBlocks()
    }

    if (isValid !== null && isApproved === null) {
      validatorPopup()
    }

    if (isValid !== null && isApproved !== null && message === "") {
      handleApprove()
    }

    if (message !== "") {
      Swal.fire({
        title: message,
        icon: error ? "warning" : "success",
      })
    }
  }, [
    isActivated,
    disabledActivate,
    isValid,
    disabledValidate,
    isApproved,
    message,
  ])

  const handleValidate = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/blocks/approve/${blocks._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      setIsValid(data.isValid)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const handleApprove = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/blocks/approve/${blocks._id}`,
        { isApproved },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      console.log(data)
      setBlocks(data.block)
      setMessage(data.message)
      setDisabledValidate(true)
      setDisabledActivate(true)
    } catch (error) {
      setError(error.response.data.msg)
      setError(true)
    }
  }

  const validatorPopup = async () => {
    const validateResponse = await Swal.fire({
      title: isValid
        ? "Hibernating block is valid, data has not been tampered"
        : "Hibernating block is invalid, data has been tampered!",
      icon: isValid ? "success" : "error",
      text: "Do you wish to proceed with validation?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
    })
    if (validateResponse.isConfirmed) {
      const approveResponse = await Swal.fire({
        title: "Approve or reject this pending block?",
        icon: "question",
        confirmButtonText: "Approve",
        denyButtonText: "Reject",
        showCloseButton: true,
        showConfirmButton: true,
        showDenyButton: true,
      })
      if (approveResponse.isConfirmed) {
        setIsApproved(true)
      } else if (approveResponse.isDenied) {
        setIsApproved(false)
      }
    }
  }

  return (
    <div>
      <HibernatingBlock block={blocks} />

      <Button
        style={{ marginTop: "40px", marginLeft: "593px" }}
        type="submit"
        variant="outlined"
        color="primary"
        disabled={disabledActivate}
        onClick={() => handleActivate()}
      >
        Activate Block
      </Button>
      <Button
        style={{ marginTop: "40px", marginLeft: "20px" }}
        variant="outlined"
        color="primary"
        disabled={disabledValidate}
        onClick={() => handleValidate()}
      >
        Validate Block
      </Button>
    </div>
  )
}

export default CreateBlocks
