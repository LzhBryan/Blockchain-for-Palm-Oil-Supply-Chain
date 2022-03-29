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
import OverallPercentage from "../components/Charts/OverallPercentage"
import WeeklyBlocks from "../components/Charts/WeeklyBlocks"
import WeeklyRecords from "../components/Charts/WeeklyRecords"
import Users from "../components/Charts/Users"
import WeeklyProducts from "../components/Charts/WeeklyProducts"
import axios from "../utils/axios"
import blockchain from "../assets/blockchain.png"

const useStyles = makeStyles({
  root: {
    height: 450,
  },
  media: {
    width: 294,
    height: 300,
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
        title: isChainValid ? "Blockchain is valid" : "Blockchain is invalid!",
        icon: isChainValid ? "success" : "error",
      })
  }, [isClicked])

  return (
    <Container style={{ marginLeft: "3.1rem", marginTop: "5rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card variant="outline">
            <CardHeader
              title={
                <Typography variant="h4" component="h1" align="center">
                  Weekly Created Blocks
                </Typography>
              }
            />

            <CardContent>
              <WeeklyBlocks />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardHeader
              title={
                <Typography variant="h5" align="center">
                  Blockchain validity
                </Typography>
              }
            />
            <CardMedia image={blockchain} className={classes.media} />
            <CardContent align="center">
              <Button variant="outlined" onClick={handleClick} align="center">
                Check validity
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card variant="outline">
            <CardHeader
              title={
                <Typography variant="h4" component="h1" align="center">
                  Weekly Created Transactions and Records
                </Typography>
              }
            />
            <CardContent>
              <WeeklyRecords />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h5" align="center">
                  Approve Reject
                </Typography>
              }
            />
            <CardContent>
              <OverallPercentage />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card variant="outline">
            <CardHeader
              title={
                <Typography variant="h4" component="h1" align="center">
                  Weekly Created Products
                </Typography>
              }
            />
            <CardContent>
              <WeeklyProducts />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h5" align="center">
                  Users
                </Typography>
              }
            />
            <CardContent>
              <Users />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default DashboardPage
