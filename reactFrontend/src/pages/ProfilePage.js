import React, { useState, useEffect } from "react"
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core"
import { RiUser6Fill } from "react-icons/ri"
import axios from "../utils/axios"
import UserRecordTable from "../components/Profile/UserRecordTable"
import UserTransactionTable from "../components/Profile/UserTransactionTable"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "70vw",
    marginTop: "5rem",
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
  const bull = <span className={classes.bullet}>•</span>
  const [profiles, setProfile] = useState([])

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/users/profile")
      setProfile(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      {profiles.map((profile) => (
        <Card className={classes.root} variant="elevation" key={profile._id}>
          <CardContent>
            <Typography
              align="center"
              variant="h3"
              component="h2"
              style={{ fontWeight: 600 }}
            >
              <RiUser6Fill
                style={{ fontSize: "2.1rem", paddingRight: "8px" }}
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
            <Typography variant="body1" component="p">
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
    </>
  )
}

export default ProfilePage
