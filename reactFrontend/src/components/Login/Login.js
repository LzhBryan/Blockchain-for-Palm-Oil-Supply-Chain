import React, { useState } from "react"
import {
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@material-ui/core"
import { FaUserCircle } from "react-icons/fa"
import axios from "axios"
import "./login.css"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")

  const login = async (e) => {
    e.preventDefault()
    if (!username || password) {
      throw new Error("Please enter username and password")
    }

    try {
      const response = await axios.post("http://localhost:5000/login")
      console.log(response)
      setToken(response.data.token)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.log(error)
    }
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
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            style={{ margin: "1rem 0" }}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ margin: "0.5rem 0" }}
            onSubmit={(e) => login(e)}
            fullWidth
            href="/User"
          >
            Sign in
          </Button>
          <Typography style={{ margin: "1rem 0" }}>
            <Link href="#">Forgot Password ?</Link>
          </Typography>
          <Typography>
            Don't have an account?
            <Link href="/Signup"> Register here</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  )
}

export default LoginPage
