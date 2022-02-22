import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core"
import TransactionRows from "./transactionRows"

const useRowStyles = makeStyles({
  tableContainer: {
    width: "70%",
    margin: "auto",
  },
})

const TransactionTable = () => {
  const classes = useRowStyles()
  const [transactions, setTransactions] = useState([])

  const getTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/transactions")
      setTransactions(response.data.transactions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h1 style={{ textAlign: "center" }}>Pending Transactions</h1>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell margin="auto">Transaction ID</TableCell>
            <TableCell margin="auto">Timestamp</TableCell>
            <TableCell margin="auto">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRows key={transaction._id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionTable
