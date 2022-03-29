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
  TableSortLabel,
  Typography,
} from "@material-ui/core"
import axios from "../../utils/axios"
import UserRows from "./UserRows"

const useRowStyles = makeStyles({
  tableContainer: {
    width: "60vw",
    marginTop: "5rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
})

const UserTable = () => {
  const classes = useRowStyles()
  const [users, setUsers] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState()

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
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
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

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users")
      setUsers(response.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        style={{ marginTop: "2.5rem" }}
      >
        User list
      </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell margin="auto" width="20%">
              User name
            </TableCell>
            <TableCell margin="auto" width="20%">
              <TableSortLabel
                active={orderBy === "role"}
                direction={orderBy === "role" ? order : "asc"}
                onClick={() => handleSortRequest()}
              >
                Role
              </TableSortLabel>
            </TableCell>
            <TableCell margin="auto">Public Key</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(users, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((users) => (
              <UserRows key={users._id} users={users} />
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 93 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default UserTable
