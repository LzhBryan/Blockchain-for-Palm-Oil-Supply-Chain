import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import LoginPage from "./components/Login/Login"
import SignUp from "./components/SignUp/Signup"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import UserPage from "./components/UserPage/UserPage"
import TransactionTable from "./components/TransactionPage/TransactionTable"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute exact path="/user" component={UserPage} />
        <ProtectedRoute
          exact
          path="/transactions"
          component={TransactionTable}
        />
      </Switch>
    </Router>
  )
}

export default App
