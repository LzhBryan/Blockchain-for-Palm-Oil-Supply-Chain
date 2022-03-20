import React, { Component } from "react"
import { Router, Switch, Route } from "react-router-dom"
import UserPage from "../UserPage/UserPage"
import TransactionForm from "../TransactionForm/TransactionForm"
import history from "./History"
import TransactionTable from "../TransactionPage/TransactionTable"
import Login from "../Login/Login"
import SignUp from "../SignUp/Signup"
import BlockList from "../ViewBlocks/BlockList"
import BlockDetails from "../ViewBlocks/BlockDetails"
import CreateBlocks from "../CreateBlocks/CreateBlocks"

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
          <Route path="/Blocks" exact component={BlockList} />
          <Route path="/Blocks/:id" exact component={BlockDetails} />
          <Route path="/CreateBlock" exact component={CreateBlocks} />
        </Switch>
      </Router>
    )
  }
}
