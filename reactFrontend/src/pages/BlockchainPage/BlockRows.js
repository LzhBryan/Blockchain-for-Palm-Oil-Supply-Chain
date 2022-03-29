import React from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { Typography } from "@material-ui/core"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.dark,
  },
  body: {
    width: "40%",
    fontSize: 13,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}))(TableRow)

const BlockRows = ({ block }) => {
  return (
    <>
      <StyledTableRow>
        <StyledTableCell
          component="th"
          scope="row"
          align="left"
          style={{ paddingLeft: "50px" }}
        >
          <Link
            to={`/block/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography component="div">BLOCK {block.blockId}</Typography>
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          <Link
            to={`/block/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography component="div">{block.timestamp}</Typography>
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          <Link
            to={`/block/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Typography component="div">{block.status}</Typography>
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align="left">
          <Link
            to={`/block/${block.blockId}`}
            style={{ textDecoration: "none", color: "black" }}
          ></Link>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

export default BlockRows
