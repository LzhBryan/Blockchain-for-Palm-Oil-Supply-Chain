import React, { Component } from "react"
import { Router, Switch, Route } from "react-router-dom"
import UserPage from "../UserPage/UserPage"
import TransactionForm from "../TransactionForm/TransactionForm"
import history from "./History"
import TransactionTable from "../TransactionPage/TransactionTable"
import Login from "../Login/Login"
import SignUp from "../SignUp/Signup"

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Signup" exact component={SignUp} />
          <Route path="/User" exact component={UserPage} />
          <Route path="/Create" exact component={TransactionForm} />
          <Route path="/Transactions" exact component={TransactionTable} />
        </Switch>
      </Router>
    )
  }
}
