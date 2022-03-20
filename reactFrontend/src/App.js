import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import LoginPage from "./components/Login/Login"
import SignUp from "./components/SignUp/Signup"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import TransactionTable from "./components/TransactionPage/TransactionTable"
import TransactionForm from "./components/TransactionForm/TransactionForm"
import BlockList from "./components/ViewBlocks/BlockList"
import BlockDetails from "./components/ViewBlocks/BlockDetails"
import CreateBlock from "./components/CreateBlocks/CreateBlock"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute
          exact
          path="/transactions"
          component={TransactionTable}
        />
        <ProtectedRoute exact path="/create" component={TransactionForm} />
        <ProtectedRoute exact path="/blocks" component={BlockList} />
        <ProtectedRoute exact path="/blocks/:id" component={BlockDetails} />
        <ProtectedRoute exact path="/createBlock" component={CreateBlock} />
      </Switch>
    </Router>
  )
}

export default App
