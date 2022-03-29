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
} from "@material-ui/core"
import Swal from "sweetalert2"
import axios from "../utils/axios"
import PendingRecords from "../components/PendingRecords/PendingRecords"

const useRowStyles = makeStyles({
  tableContainer: {
    width: "60vw",
    marginTop: "5rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
})

const TransactionTable = () => {
  const classes = useRowStyles()
  const [transactions, setTransactions] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions")
      setTransactions(response.data.transactions)
    } catch (error) {
      console.log(error.response)
      Swal.fire({
        title: error.response.data,
        icon: "error",
      })
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, transactions.length - page * rowsPerPage)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h1 style={{ textAlign: "center" }}>Pending Transactions</h1>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell margin="auto">Transaction ID</TableCell>
            <TableCell margin="auto">Timestamp</TableCell>
            <TableCell margin="auto">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction) => (
              <PendingRecords
                key={transaction._id}
                record={transaction}
                type={"Transaction"}
                api={"transactions"}
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
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default TransactionTable
