import React, { useState } from "react"
import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  TableSortLabel,
  Grid,
} from "@material-ui/core"
import Swal from "sweetalert2"
import { useFetch } from "../../utils/useFetch"
import BlockRows from "./BlockRows"
import Loading from "../../components/Loading/Loading"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell)

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: "60vw",
    marginTop: "3rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tableHead: {
    backgroundColor: "#4A78D0",
  },
}))

const BlockList = () => {
  const classes = useStyles()
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState(null)
  const [orderBy, setOrderBy] = useState()
  const { data, isLoading, serverError } = useFetch("/api/blocks/blockchain")

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSortRequest = () => {
    const isAsc = orderBy === "blockId" && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy("blockId")
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
    rowsPerPage -
    Math.min(rowsPerPage, data?.blockchain.length - page * rowsPerPage)

  if (isLoading) {
    return <Loading />
  }

  if (serverError) {
    Swal.fire({
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
            BLOCKCHAIN
          </Typography>
          <Table className={classes.table} aria-label="customized table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="center" width="30%">
                  <TableSortLabel
                    active={orderBy === "blockId"}
                    direction={orderBy === "blockId" ? order : "asc"}
                    onClick={() => handleSortRequest()}
                  >
                    <Typography
                      style={{
                        fontSize: "15px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Block ID
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" width="20%">
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
                <TableCell align="center" width="20%">
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
                <TableCell align="center">
                  <Typography variant="h6" component="div"></Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data?.blockchain, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((block) => (
                  <BlockRows key={block.blockId} block={block} />
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
            count={data?.blockchain.length}
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

export default BlockList
