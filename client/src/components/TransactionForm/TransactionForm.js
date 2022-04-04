import React from "react"
import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import * as Yup from "yup"
import Swal from "sweetalert2"
import axios from "../../utils/axios"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const initialValues = {
  fromAddress: "",
  privateKey: "",
  toAddress: "",
  amount: "",
}

const validationSchema = Yup.object({
  fromAddress: Yup.string().required("Required"),
  privateKey: Yup.string().required("Required"),
  toAddress: Yup.string().required("Required"),
  amount: Yup.number().required("Required"),
})

const TransactionForm = ({ history }) => {
  const classes = useStyles()

  const handleOnSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("/api/transactions", values)
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: "Transaction Completed!",
        text: "You can view your transaction record in your profile.",
        icon: "success",
        confirmButtonText: "Broadcast",
      })
    } catch (error) {
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: error.response.data.msg,
        icon: "error",
      })
    }
    resetForm()
  }

  return (
    <Grid container>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
        <div className={classes.root}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            <Card
              style={{
                maxWidth: 600,
                margin: "5rem auto",
                padding: "50px 50px 50px",
              }}
              elevation={3}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" align="center">
                  Create your transaction record here
                </Typography>
                <Form method="POST">
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <Field
                        name="fromAddress"
                        label="Sender's Address"
                        placeholder="Enter public key"
                        component={TextField}
                        fullWidth
                      ></Field>
                    </Grid>

                    <Grid xs={12} item>
                      <Field
                        name="privateKey"
                        label="Sender's private key"
                        placeholder="Enter private key"
                        component={TextField}
                        fullWidth
                      ></Field>
                    </Grid>

                    <Grid xs={12} item>
                      <Field
                        name="toAddress"
                        label="Receiver's public key"
                        placeholder="Enter public key"
                        component={TextField}
                        fullWidth
                      ></Field>
                    </Grid>

                    <Grid xs={12} item>
                      <Field
                        name="amount"
                        label="Amount"
                        placeholder="Enter amount"
                        component={TextField}
                        fullWidth
                      ></Field>
                    </Grid>

                    <Grid xs={12} item>
                      <Button
                        style={{ marginTop: "20px" }}
                        type="submit"
                        variant="outlined"
                        color="primary"
                      >
                        Sign & create
                      </Button>
                      <Button
                        style={{ marginTop: "20px", marginLeft: "20px" }}
                        variant="outlined"
                        color="secondary"
                        onClick={() => history.push("/dashboard")}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </CardContent>
            </Card>
          </Formik>
        </div>
      </Grid>
    </Grid>
  )
}

export default TransactionForm
