import React, { useEffect, useState } from "react"
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core"
import { FaUserCircle } from "react-icons/fa"
import Swal from "sweetalert2"
import axios from "../../utils/axios"
import "./login.css"
import { useRole } from "../../utils/UserContext"

const LoginPage = ({ history }) => {
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
    <div>
      <h1>Palm Oil Blockchain</h1>
      <Grid>
        <Paper elevation={10} className="card">
          <Grid align="center">
            <FaUserCircle className="icon" />
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
            style={{ margin: "1.7rem 0" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          {error && <p className="error">{error}</p>}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ margin: "2rem 0" }}
            onClick={(e) => login(e)}
            fullWidth
            href="/dashboard"
          >
            Sign in
          </Button>
          <Typography>
            Don't have an account?
            <Link href="/signup"> Register here</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  )
}

export default LoginPage
