import React, { useState, useEffect } from "react"
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
} from "@material-ui/core"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import axios from "../../utils/axios"
import { FcPlus } from "react-icons/fc"
import { FiMinusCircle } from "react-icons/fi"

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

const UserTransactionHistory = ({ userTransaction }) => {
  const classes = useRowStyles()
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")

  const getUsername = async () => {
    try {
      const response = await axios.get("/api/users/transactions/history")
      console.log(response.data)
      setUsername(response.data.username)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsername()
  }, [])

  const addOrsubtract = (() => {
    if (userTransaction.createdBy === username) {
      return <FiMinusCircle />
    } else {
      return <FcPlus />
    }
  })()

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
          <Typography component="div">{userTransaction._id}</Typography>
        </TableCell>
        <TableCell margin="auto">
          <Typography component="div">{userTransaction.timestamp}</Typography>
        </TableCell>
        <TableCell margin="auto">
          <Typography component="div">{userTransaction.status}</Typography>
        </TableCell>
        <TableCell margin="auto">
          <Typography component="div">{addOrsubtract}</Typography>
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
              ></Typography>
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
                        {userTransaction.fromAddress}
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
                        {userTransaction.toAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {userTransaction.amount && (
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
                            {userTransaction.amount}
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
                        {userTransaction.signature}
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
                        Created By
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {userTransaction.createdBy}
                      </Typography>
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

export default UserTransactionHistory
