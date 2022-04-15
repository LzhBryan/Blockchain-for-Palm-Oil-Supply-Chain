import React from "react"
import { CircularProgress, Grid } from "@material-ui/core"

const Loading = () => {
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
          }}
        >
          <CircularProgress
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default Loading
