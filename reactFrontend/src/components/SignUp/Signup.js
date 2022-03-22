import React, { useEffect, useState } from "react"
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  makeStyles,
} from "@material-ui/core"
import Swal from "sweetalert2"
import axios from "../../utils/axios"
import "./signup.css"

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const Keys = ({ publicKey, privateKey }) => {
  return (
    <div>
      <TextField
        id="publicKey"
        label="Public key"
        value={publicKey}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        fullWidth
      />
      <TextField
        id="privateKey"
        label="Private key"
        value={privateKey}
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        style={{ margin: "1rem 0" }}
        fullWidth
      />
    </div>
  )
}

const SignUp = ({ history }) => {
  const classes = useStyles()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showKeys, setShowKeys] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [error, setError] = useState("")

  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     history.push("/dashboard")
  //   }
  // }, [history])

  const generateKeys = async () => {
    try {
      const { data } = await axios.get("/api/auth/register")
      const { publicKey, privateKey } = data
      setShowKeys(true)
      setPublicKey(publicKey)
      setPrivateKey(privateKey)
    } catch (error) {
      setError(error.response.data.msg)
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  const registerUser = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post("/api/auth/register", {
        username,
        password,
        role,
        publicKey,
        privateKey,
      })
      localStorage.setItem("authToken", data.token)
      await Swal.fire({
        title: "Successfully registered!",
        text: "Please proceed to the login page",
        icon: "success",
      })
      history.push("/")
    } catch (error) {
      setError(error.response.data.msg)
      setTimeout(() => {
        setError("")
      }, 7000)
    }

    setUsername("")
    setPassword("")
    setRole("")
    setPublicKey("")
    setPrivateKey("")
    setShowKeys("")
  }

  return (
    <div>
      <h1>Welcome to palm oil blockchain</h1>
      <Grid>
        <Paper elevation={10} className="paper">
          <Grid align="center"></Grid>
          <h1 className="title">Sign up</h1>
          <TextField
            label="Username"
            placeholder="Enter username"
            value={username}
            style={{ margin: "1rem 0" }}
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl required className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-required-label">
              Supply chain role
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={classes.selectEmpty}
            >
              <MenuItem value={"Planter"}>Planter</MenuItem>
              <MenuItem value={"Miller"}>Miller</MenuItem>
              <MenuItem value={"Refiner"}>Refiner</MenuItem>
              <MenuItem value={"Transporter"}>Transporter</MenuItem>
              <MenuItem value={"WarehouseManager"}>WarehouseManager</MenuItem>
              <MenuItem value={"Retailer"}>Retailer</MenuItem>
              <MenuItem value={"Validator"}>Validator</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => generateKeys()}
            style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
          >
            Generate keys
          </Button>
          {showKeys && <Keys publicKey={publicKey} privateKey={privateKey} />}
          {error && <p className="error">{error}</p>}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ margin: "0.5rem 0" }}
            fullWidth
            onClick={(e) => registerUser(e)}
          >
            Sign up
          </Button>
          <Typography style={{ margin: "1rem 0" }}>
            Already have an account?
            <Link href="/"> Login here</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  )
}

export default SignUp
