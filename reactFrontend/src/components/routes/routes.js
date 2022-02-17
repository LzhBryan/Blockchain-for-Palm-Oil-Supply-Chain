import React, { Component } from "react"
import { Router, Switch, Route } from "react-router-dom"
import UserPage from "../userPage/userPage"
import TransactionForm from "../transactionForm/transactionForm"
import Encrypt from "../encrypt/encrypt"
import history from "../routes/history"

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={UserPage} />
          <Route path="/Create" exact component={TransactionForm} />
          <Route path="/Create/Encrypt" exact component={Encrypt} />
        </Switch>
      </Router>
    )
  }
}
