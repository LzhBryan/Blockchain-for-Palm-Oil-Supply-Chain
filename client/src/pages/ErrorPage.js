import React from "react"
import { Button, Grid, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const ErrorPage = () => {
  const history = useHistory()
  return (
    <Grid container>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
        <div
          style={{
            width: "60vw",
            height: "80vh",
            marginLeft: "auto",
            marginRight: "auto",
            alignContent: "center",
            display: "flex",
            marginTop: "5rem",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "15px",
              fontSize: "20px",
              fontWeight: "bolder",
              color: "#000",
            }}
          >
            Error 404 Not Found...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/dashboard")}
          >
            Back to Home Page
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default ErrorPage
