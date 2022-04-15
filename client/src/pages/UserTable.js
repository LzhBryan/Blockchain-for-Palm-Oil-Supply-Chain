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
  TableSortLabel,
  Typography,
  Grid,
} from "@material-ui/core"
import Swal from "sweetalert2"
import { useFetch } from "../utils/useFetch"
import UserRows from "../components/UserRows"
import Loading from "../components/Loading"

const useRowStyles = makeStyles((theme) => ({
  tableContainer: {
    width: "60vw",
    marginTop: "3rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tableHead: {
    backgroundColor: "#4A78D0",
  },
  tableSort: {
    color: theme.palette.common.white,
  },
}))

const UserTable = () => {
  const classes = useRowStyles()
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState()
  const { data, isLoading, serverError } = useFetch("/api/users")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSortRequest = () => {
    const isAsc = orderBy === "role" && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy("role")
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array?.map((el, index) => [el, index])
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis?.map((el) => el[0])
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data?.users.length - page * rowsPerPage)

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
            USER LIST
          </Typography>
          <Table aria-label="collapsible table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="center" width="5%" />
                <TableCell align="center" width="20%">
                  <Typography
                    style={{
                      fontSize: "15px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Username
                  </Typography>
                </TableCell>
                <TableCell width="20%" style={{ paddingLeft: "8%" }}>
                  <TableSortLabel
                    active={orderBy === "role"}
                    direction={orderBy === "role" ? order : "asc"}
                    onClick={() => handleSortRequest()}
                    classes={{
                      root: classes.tableSort,
                      iconDirectionAsc: classes.tableSort,
                      iconDirectionDesc: classes.tableSort,
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "15px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Role
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" width="50%">
                  <Typography
                    style={{
                      fontSize: "15px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Public Key
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data?.users, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((users) => (
                  <UserRows key={users._id} users={users} />
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 100 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data?.users.length}
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

export default UserTable
