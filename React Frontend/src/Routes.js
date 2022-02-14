import React, { Component } from "react"
import { Router, Switch, Route } from "react-router-dom"
import UserPage from "./UserPage"
import TransactionForm from "./TransactionForm"
import Encrypt from "./Encrypt"
import history from "./History"

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
