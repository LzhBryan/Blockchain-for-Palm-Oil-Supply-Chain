import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useParams, Link } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"
import Swal from "sweetalert2"
import Loading from "../Loading/Loading"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "65vw",
    margin: "auto",
    marginTop: "3rem",
  },
  second: {
    width: "65vw",
    margin: "auto",
    marginTop: "1rem",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    fontSize: 15,
    marginBottom: 12,
  },
  progress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  table: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  product: {
    textAlign: "center",
    width: "10vw",
  },
}))

const Trace = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [activeStep, setActiveStep] = useState(0)
  const { data, isLoading, serverError } = useFetch("/api/products/" + id)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  if (isLoading) {
    return <Loading />
  }

  if (serverError) {
    Swal.fire({
      customClass: { container: "z-index: 2000" },
      title: serverError.response.data.msg,
      icon: "error",
    })
  }

  return (
    <Grid container>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
        <Card className={classes.root} elevation={3}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Product details
              <Link to={`/products`}>
                <IoMdArrowRoundBack
                  style={{
                    position: "absolute",
                    color: "#000",
                    fontSize: "2rem",
                    marginLeft: "51vw",
                  }}
                />
              </Link>
            </Typography>

            <>
              <Typography
                className={classes.pos}
                color="textPrimary"
                style={{ paddingTop: "10px" }}
              >
                Product Name: {data?.product.productName}
              </Typography>

              <Typography
                className={classes.pos}
                color="textPrimary"
                style={{ paddingTop: "10px" }}
              >
                Product ID: {data?.product.productId}
              </Typography>

              <Typography
                className={classes.pos}
                color="textPrimary"
                style={{ paddingTop: "10px" }}
              >
                Previous Batch ID: {data?.product.prevBatchId}
              </Typography>

              <Typography
                className={classes.pos}
                color="textPrimary"
                style={{ paddingTop: "10px" }}
              >
                Timestamp: {data?.product.timestamp}
              </Typography>
            </>
          </CardContent>
        </Card>

        <Card className={classes.second} elevation={3}>
          <CardContent>
            <>
              <Box sx={{ maxWidth: 400 }}>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                  style={{ fontWeight: "bold" }}
                >
                  Product traceability
                </Typography>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {data?.record.map((record, index) => (
                    <Step key={record._id}>
                      {index === 0 && (
                        <StepLabel>
                          <Typography
                            style={{
                              marginTop: "20px",
                              marginLeft: "15px",
                              fontSize: "20px",
                              fontWeight: "bolder",
                              color: "#000",
                            }}
                          >
                            Warehouse
                          </Typography>
                        </StepLabel>
                      )}
                      {index === 1 && (
                        <StepLabel>
                          <StepLabel>
                            <Typography
                              style={{
                                marginTop: "20px",
                                marginLeft: "15px",
                                fontSize: "20px",
                                fontWeight: "bolder",
                                color: "#000",
                              }}
                            >
                              Refinery
                            </Typography>
                          </StepLabel>
                        </StepLabel>
                      )}
                      {index === 2 && (
                        <StepLabel>
                          <StepLabel>
                            <Typography
                              style={{
                                marginTop: "20px",
                                marginLeft: "15px",
                                fontSize: "20px",
                                fontWeight: "bolder",
                                color: "#000",
                              }}
                            >
                              Milling
                            </Typography>
                          </StepLabel>
                        </StepLabel>
                      )}
                      {index === 3 && (
                        <StepLabel>
                          <StepLabel>
                            <Typography
                              style={{
                                marginTop: "20px",
                                marginLeft: "15px",
                                fontSize: "20px",
                                fontWeight: "bolder",
                                color: "#000",
                              }}
                            >
                              Plantation
                            </Typography>
                          </StepLabel>
                        </StepLabel>
                      )}
                      <StepContent>
                        <TableContainer
                          style={{
                            width: "55vw",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    From Address:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.fromAddress}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    To Address:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.toAddress}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
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
                                  {record.products.map((product, index) => {
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
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    Batch ID:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.batchId}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    Previous Batch ID:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.previousBatchId}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    Transaction Receipt:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.transactionReceipt}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    Timestamp:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.timestamp}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    Signature:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.signature}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow className={classes.table}>
                                <TableCell className={classes.table}>
                                  <Typography
                                    style={{
                                      paddingTop: "15px",
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color: "#000",
                                    }}
                                  >
                                    Created by:
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  colSpan={2}
                                  style={{ wordBreak: "break-all" }}
                                >
                                  <Typography component="div">
                                    {record.createdBy}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </TableContainer>
                        <Box sx={{ mb: 2, marginTop: "1.5rem" }}>
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                              style={{ marginRight: "1rem" }}
                            >
                              {index === record.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              color="primary"
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === data?.record.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>You have traced every process</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Trace
