import React, { Component } from "react"
import { Router, Switch, Route } from "react-router-dom"
import UserPage from "../UserPage/UserPage"
import TransactionForm from "../TransactionForm/TransactionForm"
import history from "./History"
import TransactionTable from "../TransactionPage/TransactionTable"

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
