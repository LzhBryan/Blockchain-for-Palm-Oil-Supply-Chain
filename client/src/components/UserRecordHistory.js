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
    },
  },
  product: {
    textAlign: "center",
    width: "10vw",
  },
})

const UserRecordHistory = ({ records }) => {
  const classes = useRowStyles()
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width="40%" align="center">
          <Typography component="div">{records._id}</Typography>
        </TableCell>
        <TableCell margin="auto" width="25%" align="center">
          <Typography component="div">{records.timestamp}</Typography>
        </TableCell>
        <TableCell margin="auto" width="25%" align="center">
          <Typography component="div">{records.status}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                style={{
                  marginTop: "20px",
                  marginLeft: "15px",
                  fontSize: "20px",
                  fontWeight: "bolder",
                  color: "#000",
                }}
              ></Typography>
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
                          {records.products.map((product, index) => {
                            const { name, quantity } = product
                            return (
                              <TableRow key={index}>
                                <TableCell className={classes.product}>
                                  <Typography component="div">
                                    {name}
                                  </Typography>
                                </TableCell>
                                <TableCell className={classes.product}>
                                  <Typography component="div">
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
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default UserRecordHistory
