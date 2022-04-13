import React from "react"
import { MemoryRouter as Router, Switch, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@material-ui/core"
import LoginPage from "./components/Login/Login"
import SignUp from "./components/SignUp/Signup"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import TransactionTable from "./pages/TransactionTable"
import TransactionForm from "./components/TransactionForm/TransactionForm"
import SupplyChainForm from "./components/SupplyChainForm/SupplyChainForm"
import PreviousBatches from "./components/PreviousBatches/PreviousBatches"
import Products from "./components/Products/Products"
import ProductDetails from "./components/Products/ProductDetails"
import BlockList from "./pages/BlockchainPage/BlockList"
import BlockDetails from "./pages/BlockchainPage/BlockDetails"
import CreateBlock from "./components/CreateBlocks/CreateBlock"
import DashboardPage from "./pages/DashboardPage"
import RecordTable from "./pages/RecordTable"
import UserTable from "./components/UserList/UserTable"
import ProfilePage from "./pages/ProfilePage"
import { UserProvider } from "./utils/UserContext"

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),

    fontSize: 13,
  },

  palette: {
    primary: {
      light: "#f0edff",
      main: "#3f51b5",
      dark: "#8987bc",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 1000,
      sm: 1100,
      md: 1200,
      lg: 1280,
      xl: 1380,
    },
  },
})

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
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
            <ProtectedRoute
              exact
              path="/previousBatches"
              component={PreviousBatches}
            />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductDetails}
            />
            <ProtectedRoute exact path="/blockchain" component={BlockList} />
            <ProtectedRoute exact path="/block/:id" component={BlockDetails} />
            <ProtectedRoute
              exact
              path="/pendingBlock"
              component={CreateBlock}
            />
            <ProtectedRoute
              exact
              path="/pendingRecords"
              component={RecordTable}
            />
            <ProtectedRoute exact path="/users" component={UserTable} />
            <ProtectedRoute
              exact
              path="/page/profile"
              component={ProfilePage}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
