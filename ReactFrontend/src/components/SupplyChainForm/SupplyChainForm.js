import React, { useState } from "react"
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Field, FieldArray, Form, Formik } from "formik"
import { MdAddCircleOutline, MdDelete } from "react-icons/md"
import { TextField } from "formik-material-ui"
import * as Yup from "yup"
import Swal from "sweetalert2"
import axios from "../../utils/axios"
import Modal from "../Modal/SupplyChainModal"

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
  products: [{ name: "", quantity: 0 }],
  prevBatchId: "",
  transactionId: "",
}

const validationSchema = Yup.object({
  fromAddress: Yup.string().required("Required"),
  privateKey: Yup.string().required("Required"),
  toAddress: Yup.string().required("Required"),
  products: Yup.array(
    Yup.object({
      name: Yup.string().required("Required"),
      quantity: Yup.number().required("Required"),
    })
  ).min(1),
  prevBatchId: Yup.string(),
  transactionId: Yup.string().required("Required"),
})

const SupplyChainForm = () => {
  const classes = useStyles()

  const [modal, setModal] = useState(false)
  const [supplyChainRecord, setSupplyChainRecord] = useState("")

  const handleOnSubmit = async (values) => {
    try {
      const res = await axios.post("/api/supply-chain", values)
      console.log(res.data)
      setSupplyChainRecord(res.data.record)
      setModal(true)
    } catch (error) {
      await Swal.fire({
        title: error.response.data.msg,
        icon: "error",
      })
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <Card
          style={{
            maxWidth: 600,
            margin: "130px auto",
            padding: "50px 50px 50px",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              Create your supply chain record here
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

                <FieldArray name="products">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps
                    const { values } = form
                    const { products } = values
                    return (
                      <>
                        {products.map((_, index) => (
                          <Grid container item key={index} spacing={2}>
                            <Grid xs={7} item>
                              <Field
                                name={`products.${index}.name`}
                                label="Product Name"
                                component={TextField}
                                fullWidth
                              />
                            </Grid>

                            <Grid xs={3} item>
                              <Field
                                name={`products.${index}.quantity`}
                                label="Quantity"
                                component={TextField}
                                type="number"
                                fullWidth
                              />
                            </Grid>
                            {index > 0 && (
                              <Grid item xs={1}>
                                <IconButton
                                  variant="contained"
                                  onClick={() => remove(index)}
                                >
                                  <MdDelete />
                                </IconButton>
                              </Grid>
                            )}

                            <Grid item xs={1}>
                              <IconButton
                                variant="contained"
                                onClick={() => push({ name: "", quantity: 0 })}
                              >
                                <MdAddCircleOutline />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                      </>
                    )
                  }}
                </FieldArray>

                <Grid xs={12} item>
                  <Field
                    name="prevBatchId"
                    label="Previous Batch ID"
                    placeholder="Enter batch ID"
                    component={TextField}
                    fullWidth
                  ></Field>
                </Grid>

                <Grid xs={12} item>
                  <Field
                    name="transactionId"
                    label="Transaction Receipt"
                    placeholder="Enter receipt"
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
                    href="/dashboard"
                  >
                    Cancel
                  </Button>
                  {modal && <Modal record={supplyChainRecord} />}
                </Grid>
              </Grid>
            </Form>
          </CardContent>
        </Card>
      </Formik>
    </div>
  )
}

export default SupplyChainForm
