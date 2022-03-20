import React from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { Typography } from "@material-ui/core"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    width: "40%",
    fontSize: 15,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const BlockRows = ({ block }) => {
  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row" align="left">
          <Link
            to={`/blocks/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography component="div">BLOCK</Typography>
            <Typography component="div">{block.blockId}</Typography>
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          <Link
            to={`/blocks/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography component="div">{block.timestamp}</Typography>
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          <Link
            to={`/blocks/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography component="div">{block.status}</Typography>
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          <Link
            to={`/blocks/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          ></Link>
          {/* <Link to={`/Blocks/${transaction._id}`}>
            <SiHiveBlockchain
              style={{ fontSize: "1.5rem", paddingRight: "30px" }}
            />
  </Link>*/}
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

export default BlockRows
