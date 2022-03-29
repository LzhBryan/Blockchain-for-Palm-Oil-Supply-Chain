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

const Modal = ({ record }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className="modalBg">
        <div className="modalContainer">
          <h2 className="header">Record is created</h2>

          <h3 className="label">Sender's Address:</h3>
          <p className="content">{record.fromAddress}</p>

          <h3 className="label">Receiver's Address:</h3>
          <p className="content">{record.toAddress}</p>

          <h3 className="label">Products:</h3>
          <p className="content">{JSON.stringify(record.products)}</p>

          <h3 className="label">Previous Batch ID:</h3>
          <p className="content">{record.previousBatchId}</p>

          <h3 className="label">Transaction receipt:</h3>
          <p className="content">{record.transactionReceipt}</p>

          <h3 className="label">Signature:</h3>
          <p className="content">{record.signature}</p>

          <h3 className="label">Timestamp:</h3>
          <p className="content">{record.timestamp}</p>
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
