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
} from "@material-ui/core"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      width: "40.3%",
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
          <Typography component="div">{records._id}</Typography>
        </TableCell>
        <TableCell margin="auto">
          <Typography component="div">{records.timestamp}</Typography>
        </TableCell>
        <TableCell margin="auto">
          <Typography component="div">{records.status}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Sender Address
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {records.fromAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Receiver Address
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {records.toAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {records.amount && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Amount
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {records.amount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {records.products && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Products
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TableRow>
                            <TableCell className={classes.product}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "#37474f",
                                }}
                              >
                                Product name
                              </Typography>
                            </TableCell>
                            <TableCell className={classes.product}>
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "#37474f",
                                }}
                              >
                                Product quantity
                              </Typography>
                            </TableCell>
                          </TableRow>
                          {records.products.map((product) => {
                            const { name, quantity } = product
                            return (
                              <TableRow>
                                <TableCell className={classes.product}>
                                  <Typography component="div" align="center">
                                    {name}
                                  </Typography>
                                </TableCell>
                                <TableCell className={classes.product}>
                                  <Typography component="div" align="center">
                                    {quantity}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {records.batchId && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Batch ID
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {records.batchId}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {records.previousBatchId && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Previous batch ID
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {records.previousBatchId}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  {records.transactionReceipt && (
                    <>
                      <TableRow className={classes.root}>
                        <TableCell className={classes.root}>
                          <Typography
                            style={{
                              paddingTop: "15px",
                              fontSize: "15px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            Transaction Receipt
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography component="div">
                            {records.transactionReceipt}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Digital signature
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {records.signature}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Created By
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {records.createdBy}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell className={classes.root}>
                      <Typography
                        style={{
                          paddingTop: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        Approved By
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} style={{ wordBreak: "break-all" }}>
                      <Typography component="div">
                        {records.approvedBy + ""}
                      </Typography>
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
