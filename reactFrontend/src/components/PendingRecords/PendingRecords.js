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
      title: isValid
        ? `${type} is valid, data has not been tampered`
        : `${type}  is not valid, data has been tampered!`,
      icon: isValid ? "success" : "error",
      text: "Do you wish to proceed to the next step?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
    if (response.isConfirmed) {
      const secondResponse = await Swal.fire({
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
        <TableCell component="th" scope="row">
          {record._id}
        </TableCell>
        <TableCell margin="auto">{record.timestamp}</TableCell>
        <TableCell margin="auto">{record.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h4" gutterBottom component="div">
                {type}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Sender Address</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {record.fromAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Receiver Address</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {record.toAddress}
                    </TableCell>
                  </TableRow>
                  {record.amount && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <h4>Amount</h4>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{record.amount}</TableCell>
                      </TableRow>
                    </>
                  )}
                  {record.products && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <h4>Products</h4>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TableRow>
                            <TableCell className={classes.product}>
                              Product name
                            </TableCell>
                            <TableCell className={classes.product}>
                              Product quantity
                            </TableCell>
                          </TableRow>
                          {record.products.map((product, index) => {
                            const { name, quantity } = product
                            return (
                              <TableRow key={index}>
                                <TableCell className={classes.product}>
                                  {name}
                                </TableCell>
                                <TableCell className={classes.product}>
                                  {quantity}
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
                          <h4>Batch ID</h4>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{record.batchId}</TableCell>
                      </TableRow>
                    </>
                  )}
                  {record.previousBatchId && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <h4>Previous batch ID</h4>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{record.previousBatchId}</TableCell>
                      </TableRow>
                    </>
                  )}
                  {record.transactionReceipt && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <h4>Transaction Receipt</h4>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{record.transactionReceipt}</TableCell>
                      </TableRow>
                    </>
                  )}
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Digital signature</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {record.signature}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        style={{ margin: "2rem 0rem" }}
                        onClick={() => validateRecord(record._id)}
                        variant="contained"
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
