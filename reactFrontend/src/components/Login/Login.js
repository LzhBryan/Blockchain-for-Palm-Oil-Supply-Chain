import React, { useEffect, useState } from "react"
import {
  CardMedia,
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import Swal from "sweetalert2"
import axios from "../../utils/axios"
import "./login.css"
import { useRole } from "../../utils/UserContext"
import logo from "../../assets/logo.png"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  bg: {
    background: "linear-gradient(135deg, #3f51b5, #4a78d0)",
    height: "100vh",
  },
  media: {
    width: 550,
    height: 550,
    marginTop: "105px",
    marginLeft: "200px",
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
      // Swal.fire({
      //   title: "Successfully Login",
      //   icon: "success",
      // })
      history.push("/dashboard")
    } catch (error) {
      setError(error.response.data.msg)
      setTimeout(() => {
        setError("")
      }, 5000)
    }
    setUsername("")
    setPassword("")
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8} className={classes.bg}>
          <CardMedia image={logo} className={classes.media} />
        </Grid>
        <Grid item xs={4}>
          <Typography
            align="center"
            style={{
              marginTop: "13rem",
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
            {error && <p className="error">{error}</p>}
          </Grid>
          <Grid align="left">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ width: "20vm", margin: "3rem 0", marginLeft: "64px" }}
              onClick={(e) => login(e)}
              href="/dashboard"
            >
              Login
            </Button>
            <Button
              color="primary"
              variant="outlined"
              style={{ width: "20vm", marginLeft: "18px" }}
              href="/signup"
            >
              Don't have an account? Register here
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoginPage
