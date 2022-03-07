import React from "react"
import { MemoryRouter as Router, Switch, Route } from "react-router-dom"
import LoginPage from "./Login/Login"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </Router>
  )
}

export default App
