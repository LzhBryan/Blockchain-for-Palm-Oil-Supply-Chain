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
  CircularProgress,
} from "@material-ui/core"
import axios from "../../utils/axios"
import BlockRows from "./BlockRows"

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
    marginTop: "5rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
}))

const BlockList = () => {
  const classes = useStyles()
  const [blocks, setBlocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
      setIsLoading(false)
    } catch (error) {
      console.log(error.response.data.msg)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBlocks()
  }, [])

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, blocks.length - page * rowsPerPage)

  return (
    <>
      {isLoading ? (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "60vw",
            paddingTop: "250px",
            paddingLeft: "300px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        []
      )}

      <TableContainer component={Paper} className={classes.tableContainer}>
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
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">
                <Typography
                  style={{
                    fontSize: "15px",
                    color: "#37474f",
                    paddingLeft: "33px",
                  }}
                >
                  Block ID
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography style={{ fontSize: "15px", color: "#37474f" }}>
                  Timestamp
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="left">
                <Typography style={{ fontSize: "15px", color: "#37474f" }}>
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
    </>
  )
}

export default BlockList
