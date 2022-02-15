import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Routes from "./Routes"
import "./style.css"

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById("root")
)
