import React, { useState, useEffect } from "react"
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
} from "@material-ui/core"
import axios from "../../utils/axios"
import BlockRows from "./BlockRows"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell)

const useStyles = makeStyles({
  tableContainer: {
    width: "60%",
    margin: "auto",
    marginTop: "5rem",
  },
})

const BlockList = () => {
  const classes = useStyles()
  const [blocks, setBlocks] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getBlocks = async () => {
    try {
      const response = await axios.get("/api/blocks/blockchain")
      setBlocks(response.data.blockchain)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  useEffect(() => {
    getBlocks()
  }, [])

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, blocks.length - page * rowsPerPage)

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        style={{ marginTop: "2.5rem", marginBottom: "2rem" }}
      >
        Blockchain
      </Typography>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">
              <Typography variant="h6" component="div">
                Block ID
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="left">
              <Typography variant="h6" component="div">
                Timestamp
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="left">
              <Typography variant="h6" component="div">
                Status
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography variant="h6" component="div"></Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blocks
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        count={blocks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  )
}

export default BlockList
