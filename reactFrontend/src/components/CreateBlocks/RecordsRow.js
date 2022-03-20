import React, { useState } from "react"
import {
  makeStyles,
  Box,
  Collapse,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      width: "39.4%",
    },
  },
})

const RecordsRow = ({ records }) => {
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell style={{ width: "10%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {records._id}
        </TableCell>
        <TableCell margin="auto">{records.timestamp}</TableCell>
        <TableCell margin="auto">{records.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Sender Address</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {records.fromAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Receiver Address</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {records.toAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Amount</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{records.amount}</TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Digital signature</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {records.signature}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default RecordsRow
