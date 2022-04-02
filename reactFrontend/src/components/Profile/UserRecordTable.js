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
import UserRecordHistory from ".//UserRecordHistory"

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

const UserRecordTable = () => {
  const classes = useRowStyles()
  const [recordHistory, setRecordHistory] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getRecordHistory = async () => {
    try {
      const response = await axios.get("/api/users/records/history")
      setRecordHistory(response.data.records)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRecordHistory()
  }, [])

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, recordHistory.length - page * rowsPerPage)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h1 style={{ textAlign: "center" }}>User Records</h1>
      <Table aria-label="collapsible table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell />
            <TableCell margin="auto">
              <Typography
                style={{ fontSize: "15px", color: "white", fontWeight: "bold" }}
              >
                Record ID
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
          </TableRow>
        </TableHead>
        <TableBody>
          {recordHistory
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((records) => (
              <UserRecordHistory key={records._id} records={records} />
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
        count={recordHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default UserRecordTable
