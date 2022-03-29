import React, { useState } from "react"
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
import Swal from "sweetalert2"
import { useFetch } from "../utils/useFetch"
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
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const { data, isLoading, serverError } = useFetch("/api/transactions")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (serverError) {
    Swal.fire({
      title: serverError.response.data.msg,
      icon: "error",
    })
  }

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, data?.transactions.length - page * rowsPerPage)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        style={{ marginTop: "2.5rem" }}
      >
        Pending Transactions
      </Typography>
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
          {data?.transactions
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
        count={data?.transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default TransactionTable
