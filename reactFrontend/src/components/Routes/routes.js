import React, { Component } from "react"
import { Router, Switch, Route } from "react-router-dom"
import UserPage from "../UserPage/userPage"
import TransactionForm from "../TransactionForm/transactionForm"
import history from "./history"
import TransactionTable from "../TransactionPage/transactionTable"

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={UserPage} />
          <Route path="/Create" exact component={TransactionForm} />
          <Route path="/Transactions" exact component={TransactionTable} />
        </Switch>
      </Router>
    )
  }
}
