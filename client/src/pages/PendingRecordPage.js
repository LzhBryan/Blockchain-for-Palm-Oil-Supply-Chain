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
  Grid,
} from "@material-ui/core"
import Swal from "sweetalert2"
import { useFetch } from "../utils/useFetch"
import PendingRecords from "../components/PendingRecords"
import Loading from "../components/Loading"

const useRowStyles = makeStyles({
  tableContainer: {
    width: "60vw",
    marginTop: "3rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tableHead: {
    backgroundColor: "#4A78D0",
  },
})

const PendingRecordPage = () => {
  const classes = useRowStyles()
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const { data, isLoading, serverError } = useFetch("/api/supply-chain")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (isLoading) {
    return <Loading />
  }

  if (serverError) {
    Swal.fire({
      customClass: { container: "z-index: 2000" },
      title: serverError.response.data.msg,
      icon: "error",
    })
  }

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, data?.records.length - page * rowsPerPage)

  return (
    <Grid container>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
        <TableContainer
          component={Paper}
          className={classes.tableContainer}
          elevation={3}
        >
          <Typography
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "15px",
              fontSize: "20px",
              fontWeight: "bolder",
              color: "#000",
            }}
          >
            PENDING SUPPLY-CHAIN RECORDS
          </Typography>
          <Table aria-label="collapsible table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="center" width="5%" />
                <TableCell margin="auto" align="center" width="40%">
                  <Typography
                    style={{
                      fontSize: "15px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Supply Chain Record ID
                  </Typography>
                </TableCell>
                <TableCell margin="auto" align="center" width="25%">
                  <Typography
                    style={{
                      fontSize: "15px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Timestamp
                  </Typography>
                </TableCell>
                <TableCell margin="auto" align="center" width="25%">
                  <Typography
                    style={{
                      fontSize: "15px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.records
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
            count={data?.records.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default PendingRecordPage
