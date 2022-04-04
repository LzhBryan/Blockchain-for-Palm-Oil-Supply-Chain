import React, { useState } from "react"
import {
  Card,
  CardContent,
  makeStyles,
  TextField,
  Grid,
  IconButton,
} from "@material-ui/core"
import { MdSearch } from "react-icons/md"
import Swal from "sweetalert2"
import axios from "../../utils/axios"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const Products = ({ history }) => {
  const classes = useStyles()

  const [productId, setProductId] = useState("")

  const handleOnSubmit = async () => {
    try {
      await axios.get(`/api/products/${productId}`)
      history.push(`/products/${productId}`)
    } catch (error) {
      await Swal.fire({
        customClass: { container: "z-index: 2000" },
        title: error.response.data.msg,
        icon: "error",
      })
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
        <Card
          style={{
            maxWidth: "50vw",
            margin: "12rem auto",
            padding: "50px 50px 50px",
          }}
          elevation={3}
        >
          <CardContent>
            <Grid container spacing={1}>
              <Grid xs={11} item>
                <TextField
                  name="productId"
                  label="Search product"
                  placeholder="Enter product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  autoComplete="off"
                  fullWidth
                />
              </Grid>

              <Grid xs={1} item>
                <IconButton
                  type="submit"
                  style={{ marginTop: "5px" }}
                  variant="outlined"
                  color="primary"
                  onClick={handleOnSubmit}
                >
                  <MdSearch />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Products
