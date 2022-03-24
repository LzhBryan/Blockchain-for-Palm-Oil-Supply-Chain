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

const RecordTable = () => {
  const classes = useRowStyles()
  const [records, setRecords] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getRecords = async () => {
    try {
      const { data } = await axios.get("/api/supply-chain")
      setRecords(data.records)
    } catch (error) {
      await Swal.fire({
        title: error.response.data.msg,
        icon: "error",
      })
    }
  }

  useEffect(() => {
    getRecords()
  }, [])

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h1 style={{ textAlign: "center" }}>Pending Records</h1>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell margin="auto">Supply chain record ID</TableCell>
            <TableCell margin="auto">Timestamp</TableCell>
            <TableCell margin="auto">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((record) => (
              <PendingRecords
                key={record._id}
                record={record}
                type={"Supply-chain record"}
                api={"supply-chain"}
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
        count={records.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default RecordTable
