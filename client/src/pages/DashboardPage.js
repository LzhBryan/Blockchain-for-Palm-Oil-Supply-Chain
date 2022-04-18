import React, { useEffect, useState } from "react"
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  CardMedia,
  makeStyles,
} from "@material-ui/core"
import Swal from "sweetalert2"
import ApproveRejectChart from "../components/ApproveRejectChart"
import WeeklyBlocksChart from "../components/WeeklyBlocksChart"
import WeeklyRecordsChart from "../components/WeeklyRecordsChart"
import UsersChart from "../components/UsersChart"
import WeeklyProductsChart from "../components/WeeklyProductsChart"
import axios from "../utils/axios"
import blockchain from "../assets/blockchain.png"

const useStyles = makeStyles({
  root: {
    height: 450,
  },
  media: {
    maxWidth: "100%",
    height: "70%",
  },
})

const DashboardPage = () => {
  const classes = useStyles()
  const [isChainValid, setIsChainValid] = useState(null)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = async () => {
    try {
      const { data } = await axios.get("/api/blocks/blockchain/validate")
      setIsChainValid(data.isValid)
      setIsClicked(!isClicked)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (isChainValid !== null)
      Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: isChainValid ? "Blockchain is valid" : "Blockchain is invalid!",
        icon: isChainValid ? "success" : "error",
      })
  }, [isClicked])

  return (
    <Container style={{ marginLeft: "3.1rem", marginTop: "5rem" }}>
      <Grid container spacing={2}>
        <Grid item xl={8} lg={7} md={7} sm={7} xs={6}>
          <Card elevation={3} style={{ paddingBottom: "12px" }}>
            <CardHeader
              title={
                <Typography variant="h5" component="h1" align="center">
                  Weekly Created Blocks
                </Typography>
              }
            />

            <CardContent>
              <WeeklyBlocksChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} lg={2} md={2} sm={2} xs={2}>
          <Card className={classes.root} elevation={3}>
            <CardHeader
              title={
                <Typography variant="h5" align="center">
                  Blockchain validity
                </Typography>
              }
            />
            <CardMedia image={blockchain} className={classes.media} />
            <CardContent align="center">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClick}
                align="center"
              >
                Check validity
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={8} lg={7} md={7} sm={7} xs={6}>
          <Card elevation={3} style={{ paddingBottom: "11.5px" }}>
            <CardHeader
              title={
                <Typography variant="h5" component="h1" align="center">
                  Weekly Created Transactions and Records
                </Typography>
              }
            />
            <CardContent>
              <WeeklyRecordsChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} lg={2} md={2} sm={2} xs={2}>
          <Card elevation={3} style={{ paddingBottom: "1.8px" }}>
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  align="center"
                  style={{ alignItems: "center" }}
                >
                  Approved/Rejected
                </Typography>
              }
            />
            <CardContent>
              <ApproveRejectChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={8} lg={7} md={7} sm={7} xs={6}>
          <Card elevation={3} style={{ paddingBottom: "11.5px" }}>
            <CardHeader
              title={
                <Typography variant="h5" component="h1" align="center">
                  Weekly Created Products
                </Typography>
              }
            />
            <CardContent>
              <WeeklyProductsChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} lg={2} md={2} sm={2} xs={2}>
          <Card elevation={3} style={{ paddingBottom: "1.8px" }}>
            <CardHeader
              title={
                <Typography variant="h5" align="center">
                  Users
                </Typography>
              }
            />
            <CardContent>
              <UsersChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage
