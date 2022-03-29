import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import "./modal.css"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const Modal = ({ transaction }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className="modalBg">
        <div className="modalContainer">
          <h2 className="header">Transaction Completed</h2>
          <h3 className="label">Sender's Address:</h3>
          <p className="content">{transaction.fromAddress}</p>
          <h3 className="label">Receiver's Address:</h3>
          <p className="content">{transaction.toAddress}</p>
          <h3 className="label">Amount:</h3>
          <p className="content">{transaction.amount}</p>
          <h3 className="label">Signature:</h3>
          <p className="content">{transaction.signature}</p>
          <h3 className="label">Timestamp:</h3>
          <p className="content">{transaction.timestamp}</p>
          <br></br>
          <Button variant="outlined" color="primary" href="/dashboard">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
