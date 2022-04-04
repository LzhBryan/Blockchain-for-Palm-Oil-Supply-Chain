import React, { useState } from "react"
import {
  Button,
  CardMedia,
  TextField,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  makeStyles,
} from "@material-ui/core"
import Swal from "sweetalert2"
import axios from "../../utils/axios"
import logo from "../../assets/logo.png"

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
}))

const Keys = ({ publicKey, privateKey }) => {
  return (
    <div>
      <Grid align="center">
        <TextField
          id="publicKey"
          label="Public key"
          value={publicKey}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          style={{ width: "25vw", margin: "0rem 0" }}
          align="center"
        />
      </Grid>
      <Grid align="center">
        <TextField
          id="privateKey"
          label="Private key"
          value={privateKey}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          style={{ width: "25vw", margin: "1rem 0", marginBottom: "1.5rem" }}
        />
      </Grid>
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
      Swal.fire({
        title: data.msg,
        text: "Please login to proceed",
        icon: "success",
      })
      history.push("/")
    } catch (error) {
      setError(error.response.data.msg)
      setTimeout(() => {
        setError("")
      }, 5000)
    }

    setUsername("")
    setPassword("")
    setRole("")
    setPublicKey("")
    setPrivateKey("")
    setShowKeys("")
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
              marginTop: "95px",
              fontSize: "25px",
              fontWeight: "bolder",
              color: "#000",
            }}
          >
            SIGN UP
          </Typography>
          <Grid align="center">
            <TextField
              label="Username"
              placeholder="Enter username"
              value={username}
              style={{ width: "25vw", marginTop: "2rem" }}
              variant="standard"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid align="center">
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              value={password}
              style={{ width: "25vw", marginTop: "15px" }}
              variant="standard"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid align="center">
            <FormControl
              required
              className={classes.formControl}
              style={{ width: "25vw" }}
            >
              <InputLabel id="demo-simple-select-required-label">
                Supply chain role
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={classes.selectEmpty}
                align="left"
              >
                <MenuItem value={"Planter"}>Planter</MenuItem>
                <MenuItem value={"Miller"}>Miller</MenuItem>
                <MenuItem value={"Refiner"}>Refiner</MenuItem>
                <MenuItem value={"WarehouseManager"}>WarehouseManager</MenuItem>
                <MenuItem value={"Retailer"}>Retailer</MenuItem>
                <MenuItem value={"Validator"}>Validator</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => generateKeys()}
              style={{ width: "20vm", margin: "1rem 0" }}
            >
              Generate keys
            </Button>
            {showKeys && <Keys publicKey={publicKey} privateKey={privateKey} />}
            {error && (
              <p
                className="error"
                style={{
                  color: "red",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                  width: "30vw",
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
              style={{ width: "20vm", marginTop: "0.5rem" }}
              onClick={(e) => registerUser(e)}
            >
              Sign up
            </Button>
          </Grid>
          <Grid align="center">
            <Button
              color="primary"
              variant="outlined"
              style={{ width: "20vm", marginTop: "1.5rem" }}
              onClick={() => history.push("/")}
            >
              Already have an account? Login here
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignUp
