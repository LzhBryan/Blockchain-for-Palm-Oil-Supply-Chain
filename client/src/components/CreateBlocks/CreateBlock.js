import React, { useEffect, useState } from "react"
import { Grid, Button } from "@material-ui/core"
import Swal from "sweetalert2"
import axios from "../../utils/axios"
import HibernatingBlock from "./HibernatingBlock"

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
      const response = await axios.get("/api/blocks")
      setBlocks(response.data.waitingBlock)
      if (response.data.waitingBlock.status === "Hibernating") {
        setDisabledActivate(false)
        setDisabledValidate(true)
      } else if (response.data.waitingBlock.status === "Pending") {
        setDisabledActivate(true)
        setDisabledValidate(false)
      }
    } catch (error) {
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: error.response.data.msg,
        icon: "error",
      })
    }
  }

  const handleActivate = async () => {
    try {
      const { data } = await axios.patch(`/api/blocks/${blocks._id}`, {})
      setBlocks(data.activateBlock)
      setDisabledActivate(true)
      setDisabledValidate(false)
      setIsActivated(true)
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: "This block has been activated!",
        text: "Please proceed with validation",
        icon: "success",
      })
    } catch (error) {
      setError(true)
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: "This block cannot be activated!",
        text: error.response.data.msg,
        icon: "error",
      })
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
        customClass: { container: "z-index: 2000" },
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
      const { data } = await axios.get(`/api/blocks/approve/${blocks._id}`)
      setIsValid(data.isValid)
    } catch (error) {
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: error.response.data.msg,
        icon: "error",
      })
    }
  }

  const handleApprove = async () => {
    try {
      const { data } = await axios.put(`/api/blocks/approve/${blocks._id}`, {
        isApproved,
      })
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
      customClass: { container: "z-index: 2000" },
      title: isValid
        ? "Block is valid, data has not been tampered"
        : "Block is invalid, data has been tampered!",
      icon: isValid ? "success" : "error",
      text: "Do you wish to proceed to the consensus?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCloseButton: true,
      showCancelButton: true,
    })
    if (validateResponse.isConfirmed) {
      const approveResponse = await Swal.fire({
        customClass: { container: "z-index: 2000" },
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
    <Grid container>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
        <HibernatingBlock block={blocks} />
      </Grid>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "40vw",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
            marginTop: "1.5rem",
          }}
        >
          <Button
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            type="submit"
            variant="outlined"
            color="primary"
            disabled={disabledActivate}
            onClick={() => handleActivate()}
          >
            Activate Block
          </Button>
          <Button
            // style={{ marginTop: "40px", marginLeft: "20px" }}
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            variant="outlined"
            color="primary"
            disabled={disabledValidate}
            onClick={() => handleValidate()}
          >
            Validate Block
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default CreateBlocks
