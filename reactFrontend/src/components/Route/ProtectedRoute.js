import React, { useState } from "react"
import { Redirect, Route } from "react-router-dom"
import clsx from "clsx"
import { makeStyles, Container } from "@material-ui/core"
import Navbar from "../Navbar/Navbar"

const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    marginTop: "4.55em",
    marginLeft: "10.4em",
    marginRight: "0px",
    flexGrow: 1,
    height: "100%",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerShift: {
    padding: 0,
    marginTop: "4.55em",
    marginLeft: drawerWidth - 50,
    marginRight: "0px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("authToken")) {
          return (
            <>
              <Navbar open={open} setOpen={setOpen} />
              <Container
                className={clsx(classes.container, {
                  [classes.containerShift]: open,
                })}
              >
                <Component {...props} />
              </Container>
            </>
          )
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
