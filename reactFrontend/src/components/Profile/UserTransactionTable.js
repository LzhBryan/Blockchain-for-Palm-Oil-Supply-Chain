import React, { useState, useEffect } from "react"
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@material-ui/core"
import axios from "../../utils/axios"
import UserTransactionHistory from ".//UserTransactionHistory"

const useRowStyles = makeStyles({
  tableContainer: {
    width: "70vw",
    marginTop: "1rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tableHead: {
    backgroundColor: "#4A78D0",
  },
})

const UserTransactionTable = () => {
  const classes = useRowStyles()
  const [transactionHistory, setTransactionHistory] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getTransactionHistory = async () => {
    try {
      const response = await axios.get("/api/users/transactions/history")
      console.log(response.data)
      setTransactionHistory(response.data.transactions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTransactionHistory()
  }, [])

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, transactionHistory.length - page * rowsPerPage)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h1 style={{ textAlign: "center" }}>User Transactions</h1>
      <Table aria-label="collapsible table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell />
            <TableCell margin="auto">
              <Typography
                style={{ fontSize: "15px", color: "white", fontWeight: "bold" }}
              >
                Transaction ID
              </Typography>
            </TableCell>
            <TableCell margin="auto">
              <Typography
                style={{ fontSize: "15px", color: "white", fontWeight: "bold" }}
              >
                Timestamp
              </Typography>
            </TableCell>
            <TableCell margin="auto">
              <Typography
                style={{ fontSize: "15px", color: "white", fontWeight: "bold" }}
              >
                Status
              </Typography>
            </TableCell>
            <TableCell margin="auto"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionHistory
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((userTransaction) => (
              <UserTransactionHistory
                key={userTransaction._id}
                userTransaction={userTransaction}
              />
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 57 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={transactionHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default UserTransactionTable
