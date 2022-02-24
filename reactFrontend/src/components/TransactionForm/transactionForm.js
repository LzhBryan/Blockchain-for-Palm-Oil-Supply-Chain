import React, { useState } from "react"
import axios from "axios"
import Modal from "../Modal/modal"
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const TransactionForm = () => {
  const classes = useStyles()

  const [from, setFrom] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [to, setTo] = useState("")
  const [amount, setAmount] = useState("")
  const [modal, setModal] = useState(false)
  const [transaction, setTransaction] = useState("")

  const handlePopup = () => {
    if (from && privateKey && to && amount) {
      setModal(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const transaction = { from, privateKey, to, amount }

    if (from && privateKey && to && amount) {
      const res = await axios.post(
        "http://localhost:5000/api/transactions",
        transaction
      )
      console.log(res.data)
      setTransaction(res.data.transaction)
      setFrom("")
      setPrivateKey("")
      setTo("")
      setAmount("")
    }
  }

  /*const handlePopup = () => {
    Swal.fire("Your transaction is completed!")
  }*/

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
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
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
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
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
                  href="/"
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
