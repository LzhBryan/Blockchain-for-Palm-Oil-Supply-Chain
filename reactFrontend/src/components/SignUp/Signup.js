import React, { useState } from "react"
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
import axios from "axios"
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

const SignUp = () => {
  const classes = useStyles()

  const [showKeys, setShowKeys] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [role, setRole] = useState("")

  const generateKeys = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/register"
      )
      const { publicKey, privateKey } = response.data
      setShowKeys(true)
      setPublicKey(publicKey)
      setPrivateKey(privateKey)
    } catch (error) {
      console.log(error)
    }
  }

  const registerUser = async () => {}

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
            style={{ margin: "1rem 0" }}
            fullWidth
            required
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
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
            style={{ margin: "2rem 0" }}
          >
            Generate keys
          </Button>
          {showKeys && <Keys publicKey={publicKey} privateKey={privateKey} />}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ margin: "0.5rem 0" }}
            fullWidth
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
