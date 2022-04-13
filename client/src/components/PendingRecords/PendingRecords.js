import React, { useEffect, useState } from "react"
import {
  makeStyles,
  Box,
  Collapse,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import Swal from "sweetalert2"
import axios from "../../utils/axios"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  product: {
    textAlign: "center",
    width: "10vw",
  },
})

const PendingRecords = ({ record, type, api }) => {
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()
  const [isValid, setIsValid] = useState(null)
  const [isApproved, setIsApproved] = useState(null)
  const [id, setId] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const validateRecord = async (id) => {
    setId(id)
    setIsClicked(!isClicked)
    try {
      const { data } = await axios.get(`/api/${api}/validate/${id}`)
      setIsValid(data.isValid)
    } catch (error) {
      console.log(error.response.error.msg)
    }
  }

  const approveRecord = async () => {
    setIsDisabled(true)
    try {
      const { data } = await axios.patch(`/api/${api}/validate/${id}`, {
        isApproved,
      })
      setMessage(data.msg)
    } catch (error) {
      setMessage(error.response.data.msg)
      setError(true)
    }
  }

  const popup = async () => {
    const response = await Swal.fire({
      customClass: { container: "z-index: 2000" },
      title: isValid
        ? `${type} is valid, data has not been tampered`
        : `${type}  is not valid, data has been tampered!`,
      icon: isValid ? "success" : "error",
      text: "Do you wish to proceed to the consensus?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
    if (response.isConfirmed) {
      const secondResponse = await Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: `Approve or reject this ${type} ?`,
        icon: "question",
        showCloseButton: true,
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText: "Approve",
        denyButtonText: "Reject",
      })
      if (secondResponse.isConfirmed) {
        setIsApproved(true)
      } else if (secondResponse.isDenied) {
        setIsApproved(false)
      }
    }
  }

  useEffect(() => {
    if (id !== "" && isApproved === null) {
      popup()
    }

    if (isApproved !== null && message === "") {
      approveRecord()
    }

    if (message !== "") {
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: message,
        icon: error ? "warning" : "success",
      })
    }
  }, [id, isClicked, isValid, isApproved, message, error])

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width="40%" align="center">
          <Typography component="div">{record._id}</Typography>
        </TableCell>
        <TableCell margin="auto" width="25%" align="center">
          <Typography component="div">{record.timestamp}</Typography>
        </TableCell>
        <TableCell margin="auto" width="25%" align="center">
          <Typography component="div">{record.status}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                style={{
                  marginTop: "20px",
                  marginLeft: "15px",
                  fontSize: "20px",
                  fontWeight: "bolder",
                  color: "#000",
                }}
              >
                {type}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Sender Address
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {record.fromAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Receiver Address
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {record.toAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {record.amount && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Amount
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {record.amount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {record.products && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Products
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TableRow>
                            <TableCell className={classes.product}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "#37474f",
                                }}
                              >
                                Product name
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.product}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "#37474f",
                                }}
                              >
                                Product quantity
                              </Typography>
                            </TableCell>
                          </TableRow>
                          {record.products.map((product, index) => {
                            const { name, quantity } = product
                            return (
                              <TableRow key={index}>
                                <TableCell className={classes.product}>
                                  <Typography component="div">
                                    {name}
                                  </Typography>
                                </TableCell>
                                <TableCell className={classes.product}>
                                  <Typography component="div">
                                    {quantity}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {record.batchId && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Batch ID
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {record.batchId}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {record.previousBatchId && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Previous batch ID
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {record.previousBatchId}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {record.transactionReceipt && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Transaction Receipt
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {record.transactionReceipt}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Digital signature
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {record.signature}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        style={{
                          margin: "2rem 0rem",
                        }}
                        onClick={() => validateRecord(record._id)}
                        variant="outlined"
                        color="primary"
                        disabled={isDisabled}
                      >
                        {`Validate ${type}`}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default PendingRecords
