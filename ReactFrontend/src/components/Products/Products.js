import React, { useState } from "react"
import {
  Card,
  CardContent,
  InputBase,
  makeStyles,
  TextField,
  Grid,
  IconButton,
} from "@material-ui/core"
import { MdSearch } from "react-icons/md"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "../../utils/axios"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}))

const Products = () => {
  const classes = useStyles()

  const [productId, setProductId] = useState("")

  const handleOnSubmit = async () => {
    try {
      const res = await axios.get(`/api/products/${productId}`)
      console.log(res.data)
    } catch (error) {
      await Swal.fire({
        title: error.response.data.msg,
        icon: "error",
      })
    }
  }

  return (
    <div className={classes.root}>
      <Card
        style={{
          maxWidth: 600,
          margin: "280px auto",
          padding: "50px 50px 50px",
        }}
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
              <Link to={`/products/${productId}`}>
                <IconButton
                  type="submit"
                  style={{ marginTop: "5px" }}
                  variant="outlined"
                  color="primary"
                  onClick={handleOnSubmit}
                >
                  <MdSearch />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products
