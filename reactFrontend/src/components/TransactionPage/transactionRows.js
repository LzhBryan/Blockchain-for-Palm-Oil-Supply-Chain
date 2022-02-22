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
  Typography,
  Button,
} from "@material-ui/core"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
})

const TransactionRow = (props) => {
  const { transaction } = props
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {transaction._id}
        </TableCell>
        <TableCell margin="auto">{transaction.timestamp}</TableCell>
        <TableCell margin="auto">Pending</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h4" gutterBottom component="div">
                Transaction
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Sender Address</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {transaction.fromAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Receiver Address</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {transaction.toAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Amount</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <h4>Digital signature</h4>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      {transaction.signature}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button
                        style={{ margin: "2rem 0rem" }}
                        onClick={() => console.log(transaction)}
                        variant="contained"
                      >
                        Validate transaction
                      </Button>
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

export default TransactionRow
