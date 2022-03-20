import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import axios from "../../utils/axios"
import Modal from "../Modal/Modal"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const TransactionForm = () => {
  const classes = useStyles()

  const [fromAddress, setFromAddress] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [modal, setModal] = useState(false)
  const [transaction, setTransaction] = useState("")

  const handlePopup = () => {
    if (fromAddress && privateKey && toAddress && amount) {
      setModal(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const transaction = { fromAddress, privateKey, toAddress, amount }

    if (fromAddress && privateKey && toAddress && amount) {
      const res = await axios.post("/api/transactions", transaction)
      console.log(res.data)
      setTransaction(res.data.transaction)
      setFromAddress("")
      setPrivateKey("")
      setToAddress("")
      setAmount("")
    }
  }

  return (
    <div className={classes.root}>
      <Card
        style={{
          maxWidth: 600,
          margin: "130px auto",
          padding: "50px 50px 50px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" align="left">
            Create your transactions here
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  className="fromAddress"
                  name="from"
                  label="Sender's Address"
                  placeholder="Enter public key"
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  name="privateKey"
                  label="Sender's Private Key"
                  placeholder="Enter private key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  name="to"
                  label="Receiver's Address"
                  placeholder="Enter public key"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  name="amount"
                  label="Amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <Button
                  style={{ marginTop: "20px" }}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={handlePopup}
                >
                  Sign & create
                </Button>
                <Button
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                  variant="outlined"
                  color="secondary"
                  href="/user"
                >
                  Cancel
                </Button>
                {modal && <Modal transaction={transaction} />}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionForm
