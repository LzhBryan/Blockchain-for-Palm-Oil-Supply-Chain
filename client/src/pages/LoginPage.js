import React, { useEffect, useState } from "react"
import {
  CardMedia,
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import axios from "../utils/axios"
import { useRole } from "../utils/UserContext"
import logo from "../assets/logo.png"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  bg: {
    background: "linear-gradient(135deg, #3f51b5, #4a78d0, #f0edff)",
    height: "100vh",
  },
  media: {
    maxWidth: "60%",
    height: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "9rem",
  },
})

const LoginPage = ({ history }) => {
  const classes = useStyles()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { setRole } = useRole()

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/dashboard")
    }
    return () => {}
  }, [])

  const login = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      })
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("role", data.user.role)
      setRole(data.user.role)
      history.push("/dashboard")
    } catch (error) {
      setError(error.response.data.msg)
      setTimeout(() => {
        setError("")
      }, 3000)
    }
    setUsername("")
    setPassword("")
  }

  return (
    <Grid container>
      <Grid item xs={8} className={classes.bg}>
        <CardMedia className={classes.media} image={logo} />
      </Grid>
      <Grid item xs={4} maxWidth="100vh">
        <Typography
          align="center"
          style={{
            marginTop: "10rem",
            fontSize: "25px",
            fontWeight: "bolder",
            color: "#000",
          }}
        >
          LOGIN
        </Typography>
        <Grid align="center">
          <TextField
            label="Username"
            placeholder="Enter username"
            style={{ width: "25vw", margin: "2rem 0" }}
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Grid>
        <Grid align="center">
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            style={{ width: "25vw" }}
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          {error && (
            <p
              style={{
                marginTop: "2rem",
                color: "red",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.1em",
              }}
            >
              {error}
            </p>
          )}
        </Grid>
        <Grid align="center">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{
              width: "20vw",
              margin: "3rem 0",
            }}
            onClick={(e) => login(e)}
            href="/dashboard"
          >
            Login
          </Button>
          <Button
            color="primary"
            variant="outlined"
            style={{ width: "20vw" }}
            onClick={() => history.push("/signup")}
          >
            Don't have an account? Register here
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoginPage
