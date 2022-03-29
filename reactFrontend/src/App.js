import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LoginPage from "./components/Login/Login"
import SignUp from "./components/SignUp/Signup"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import TransactionTable from "./pages/TransactionTable"
import TransactionForm from "./components/TransactionForm/TransactionForm"
import SupplyChainForm from "./components/SupplyChainForm/SupplyChainForm"
import BlockList from "./pages/BlockchainPage/BlockList"
import BlockDetails from "./pages/BlockchainPage/BlockDetails"
import CreateBlock from "./components/CreateBlocks/CreateBlock"
import DashboardPage from "./pages/DashboardPage"
import RecordTable from "./pages/RecordTable"
import UserTable from "./components/UserList/UserTable"

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
        <ProtectedRoute
          exact
          path="/createSupplyChainRecord"
          component={SupplyChainForm}
        />
        <ProtectedRoute exact path="/blockchain" component={BlockList} />
        <ProtectedRoute exact path="/block/:id" component={BlockDetails} />
        <ProtectedRoute exact path="/pendingBlock" component={CreateBlock} />
        <ProtectedRoute exact path="/pendingRecords" component={RecordTable} />
        <ProtectedRoute exact path="/users" component={UserTable} />
      </Switch>
    </Router>
  )
}

export default App
