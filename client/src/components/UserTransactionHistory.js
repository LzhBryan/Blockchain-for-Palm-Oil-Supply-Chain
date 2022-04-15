import React, { useState } from "react"
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

const UserTransactionHistory = ({ userTransaction, username }) => {
  const classes = useRowStyles()
  const [open, setOpen] = useState(false)

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
        <TableCell component="th" scope="row" width="30%" align="center">
          <Typography component="div">{userTransaction._id}</Typography>
        </TableCell>
        <TableCell margin="auto" width="25%" align="center">
          <Typography component="div">{userTransaction.timestamp}</Typography>
        </TableCell>
        <TableCell margin="auto" width="25%" align="center">
          <Typography component="div">{userTransaction.status}</Typography>
        </TableCell>
        <TableCell margin="auto" width="15%" align="center">
          {userTransaction.createdBy === username ? (
            <Typography style={{ color: "#EF4D61" }}>
              ${userTransaction.amount}
            </Typography>
          ) : (
            <Typography style={{ color: "#54C097" }}>
              ${userTransaction.amount}
            </Typography>
          )}
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
