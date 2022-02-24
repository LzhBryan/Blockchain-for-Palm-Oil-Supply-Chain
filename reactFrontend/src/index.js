import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./components/Routes/Routes"

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById("root")
)
