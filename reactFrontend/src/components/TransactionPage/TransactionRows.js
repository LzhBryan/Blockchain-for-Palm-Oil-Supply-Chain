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
})

const TransactionRow = ({ transaction }) => {
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()
  const [isValid, setIsValid] = useState(null)
  const [isApproved, setIsApproved] = useState(null)
  const [id, setId] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  const validateTransaction = async (id) => {
    setId(id)
    setIsClicked(!isClicked)
    try {
      const { data } = await axios.get(`/api/transactions/validate/${id}`)
      setIsValid(data.isValid)
    } catch (error) {
      console.log(error.response.error.msg)
    }
  }

  const approveTransaction = async () => {
    setIsDisabled(true)
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/transactions/validate/${id}`,
        { isApproved }
      )
      setMessage(data.msg)
    } catch (error) {
      setMessage(error.response.data.msg)
      setError(true)
    }
  }

  useEffect(() => {
    if (id !== "" && isApproved === null) {
      popup()
    }

    if (isApproved !== null && message === "") {
      approveTransaction()
    }

    if (message !== "") {
      Swal.fire({
        title: message,
        icon: error ? "warning" : "success",
      })
    }
  }, [id, isClicked, isValid, isApproved, message, error])

  const popup = async () => {
    const response = await Swal.fire({
      title: isValid
        ? "Transaction is valid, data has not been tampered"
        : "Transaction is not valid, data has been tampered!",
      icon: isValid ? "success" : "error",
      text: "Do you wish to proceed to the next step?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
    if (response.isConfirmed) {
      const secondResponse = await Swal.fire({
        title: "Approve or reject this transaction?",
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
          {transaction._id}
        </TableCell>
        <TableCell margin="auto">{transaction.timestamp}</TableCell>
        <TableCell margin="auto">{transaction.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h4" gutterBottom component="div">
                Transaction
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
                      {transaction.fromAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Receiver Address</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {transaction.toAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Amount</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Digital signature</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {transaction.signature}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        style={{ margin: "2rem 0rem" }}
                        onClick={() => validateTransaction(transaction._id)}
                        variant="contained"
                        disabled={isDisabled}
                      >
                        Validate transaction
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

export default TransactionRow
