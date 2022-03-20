import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginPage from "./components/Login/Login"
import SignUp from "./components/SignUp/Signup"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import TransactionTable from "./components/TransactionPage/TransactionTable"
import TransactionForm from "./components/TransactionForm/TransactionForm"
import BlockList from "./pages/BlockchainPage/BlockList"
import BlockDetails from "./pages/BlockchainPage/BlockDetails"
import CreateBlock from "./components/CreateBlocks/CreateBlock"
import DashboardPage from "./pages/DashboardPage"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
        <ProtectedRoute
          exact
          path="/pendingTransactions"
          component={TransactionTable}
        />
        <ProtectedRoute
          exact
          path="/createTransaction"
          component={TransactionForm}
        />
        <ProtectedRoute exact path="/blockchain" component={BlockList} />
        <ProtectedRoute exact path="/block/:id" component={BlockDetails} />
        <ProtectedRoute exact path="/pendingBlock" component={CreateBlock} />
      </Switch>
    </Router>
  )
}

export default App
