import React, { useState, useEffect } from "react"
import axios from "axios"
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Typography } from "@material-ui/core"
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
  },
})

const BlockList = () => {
  const [blocks, setBlocks] = useState([])
  const classes = useStyles()

  const getBlocks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blocks/blockchain",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      setBlocks(response.data.blockchain)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  useEffect(() => {
    getBlocks()
  }, [])

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h1 style={{ textAlign: "center" }}>View Blocks</h1>
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
          {blocks.map((block) => (
            <BlockRows key={block.blockId} block={block} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlockList
