import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Grid,
} from "@material-ui/core"
import { MdOutlineExitToApp } from "react-icons/md"
import { useParams, Link } from "react-router-dom"
import { useFetch } from "../../utils/useFetch"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "78vw",
    margin: "auto",
    marginTop: "5rem",
  },
  second: {
    width: "78vw",
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
}))

const Trace = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [activeStep, setActiveStep] = useState(0)
  const {
    data: tracingData,
    isLoading,
    serverError,
  } = useFetch("/api/products/" + id)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Grid container>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            Product details
            <Link to={`/products`}>
              <MdOutlineExitToApp
                style={{
                  color: "#000",
                  fontSize: "2rem",
                  padding: "5px",
                  marginLeft: "72vw",
                }}
              />
            </Link>
          </Typography>

          {isLoading && (
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          )}
          {serverError && (
            <Typography className={classes.pos} color="textSecondary">
              Error in fetching data...
            </Typography>
          )}

          {tracingData && (
            <>
              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ paddingTop: "10px" }}
              >
                Product Name: {tracingData.product.productName}
              </Typography>

              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ paddingTop: "10px" }}
              >
                Product ID: {tracingData.product.productId}
              </Typography>

              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ paddingTop: "10px" }}
              >
                Previous Batch ID: {tracingData.product.prevBatchId}
              </Typography>

              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ paddingTop: "10px" }}
              >
                Timestamp: {tracingData.product.timestamp}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Card className={classes.second}>
        <CardContent>
          {tracingData && (
            <>
              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {tracingData.record.map((record, index) => (
                    <Step key={record._id}>
                      {index === 0 && <StepLabel>Warehouse</StepLabel>}
                      {index === 1 && <StepLabel>Refinery</StepLabel>}
                      {index === 2 && <StepLabel>Milling</StepLabel>}
                      {index === 3 && <StepLabel>Plantation</StepLabel>}
                      <StepContent>
                        <Typography>
                          From Address: {record.fromAddress}
                        </Typography>
                        <Typography>To Address: {record.toAddress}</Typography>
                        <Typography>Batch ID: {record.batchId}</Typography>
                        <Typography>
                          Previous batch ID: {record.previousBatchId}
                        </Typography>
                        <Typography>
                          Transaction Receipt: {record.transactionReceipt}
                        </Typography>
                        <Typography>Timestamp: {record.timestamp}</Typography>
                        <Typography>Signature: {record.signature}</Typography>
                        <Typography>Status: {record.status}</Typography>
                        <Typography>
                          Approved By: {record.approvedBy}
                        </Typography>
                        <Typography>
                          Rejected By: {record.rejectedBy}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === record.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
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
                {activeStep === tracingData.record.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>You've look every process</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Trace
