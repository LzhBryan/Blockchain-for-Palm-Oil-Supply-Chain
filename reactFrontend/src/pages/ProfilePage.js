import React from "react"
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core"
import { FaUserTie } from "react-icons/fa"
import Swal from "sweetalert2"
import { useFetch } from "../utils/useFetch"
import Loading from "../components/Loading/Loading"
import UserRecordTable from "../components/Profile/UserRecordTable"
import UserTransactionTable from "../components/Profile/UserTransactionTable"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "60vw",
    marginTop: "3rem",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const ProfilePage = () => {
  const classes = useStyles()
  const { data, isLoading, serverError } = useFetch("/api/users/profile")

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
        {data?.user.map((profile) => (
          <Card className={classes.root} variant="elevation" key={profile._id}>
            <CardContent>
              <Typography
                align="center"
                variant="h3"
                component="h2"
                style={{ fontWeight: 600 }}
              >
                <FaUserTie
                  style={{
                    fontSize: "3rem",
                    paddingRight: "15px",
                    paddingTop: "10px",
                  }}
                />
                {profile.username}'s Profile
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ fontWeight: 600 }}
              >
                <br></br>
                Public Key:
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ wordBreak: "break-all" }}
              >
                {profile.publicKey}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                style={{ fontWeight: 600 }}
              >
                <br></br>
                Private Key:
              </Typography>
              <Typography variant="body1" component="p">
                {profile.privateKey}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <UserTransactionTable />
        <UserRecordTable />
      </Grid>
    </Grid>
  )
}

export default ProfilePage
