import React, { Component } from "react"
import { Router, Switch, Route } from "react-router-dom"
import UserPage from "../UserPage/userPage"
import TransactionForm from "../TransactionForm/transactionForm"
import history from "./history"

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={UserPage} />
          <Route path="/Create" exact component={TransactionForm} />
        </Switch>
      </Router>
    )
  }
}
