import React from "react"
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  FormControl,
  MenuItem,
} from "@material-ui/core"
import { Field, FieldArray, Form, Formik } from "formik"
import { MdAddCircleOutline, MdDelete } from "react-icons/md"
import { TextField, Select } from "formik-material-ui"
import * as Yup from "yup"
import Swal from "sweetalert2"
import axios from "../utils/axios"
import { useRole } from "../utils/UserContext"

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

const SupplyChainForm = ({ history }) => {
  const classes = useStyles()
  const { role } = useRole()

  const handleOnSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("/api/supply-chain", values)
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: "Record is created!",
        text: "You can view your supply chain record in your profile.",
        icon: "success",
        confirmButtonText: "Broadcast",
      })
    } catch (error) {
      await Swal.fire({
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
                                  <FormControl fullWidth>
                                    <Field
                                      name={`products.${index}.name`}
                                      label="Product Name"
                                      component={Select}
                                    >
                                      {role === "Planter" && [
                                        <MenuItem
                                          value="PALM FRUITS"
                                          key={index}
                                        >
                                          PALM FRUITS
                                        </MenuItem>,
                                        <MenuItem
                                          value="EMPTY FRUIT BUNCH"
                                          key={index}
                                        >
                                          EMPTY FRUIT BUNCH
                                        </MenuItem>,
                                      ]}

                                      {role === "Miller" && [
                                        <MenuItem
                                          value="CRUDE PALM OIL"
                                          key={"CRUDE PALM OIL " + index}
                                        >
                                          CRUDE PALM OIL
                                        </MenuItem>,
                                        <MenuItem
                                          value="CRUDE PALM KERNEL OIL"
                                          key={"CRUDE PALM KERNEL OIL " + index}
                                        >
                                          CRUDE PALM KERNEL OIL
                                        </MenuItem>,
                                      ]}

                                      {role === "Refiner" && [
                                        <MenuItem
                                          value="PALM OIL"
                                          key={"PALM OIL " + index}
                                        >
                                          PALM OIL
                                        </MenuItem>,
                                        <MenuItem
                                          value="PALM KERNEL OIL"
                                          key={"PALM KERNEL OIL " + index}
                                        >
                                          PALM KERNEL OIL
                                        </MenuItem>,
                                        <MenuItem
                                          value="BIOFUEL"
                                          key={"BIOFUEL " + index}
                                        >
                                          BIOFUEL
                                        </MenuItem>,
                                      ]}

                                      {role === "WarehouseManager" && [
                                        <MenuItem
                                          value="PALM OIL"
                                          key={"PALM OIL " + index}
                                        >
                                          PALM OIL
                                        </MenuItem>,
                                        <MenuItem
                                          value="PALM KERNEL OIL"
                                          key={"PALM KERNEL OIL " + index}
                                        >
                                          PALM KERNEL OIL
                                        </MenuItem>,
                                        <MenuItem
                                          value="BIOFUEL"
                                          key={"BIOFUEL " + index}
                                        >
                                          BIOFUEL
                                        </MenuItem>,
                                      ]}
                                    </Field>
                                  </FormControl>
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
                                    onClick={() =>
                                      push({ name: "", quantity: 0 })
                                    }
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

                    {role !== "Planter" && (
                      <Grid xs={12} item>
                        <Field
                          name="prevBatchId"
                          label="Previous Batch ID"
                          placeholder="Enter batch ID"
                          component={TextField}
                          fullWidth
                        ></Field>
                      </Grid>
                    )}

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

export default SupplyChainForm
