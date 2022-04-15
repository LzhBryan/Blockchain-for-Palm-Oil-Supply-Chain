import React from "react"
import { MemoryRouter as Router, Switch, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@material-ui/core"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProtectedRoute from "./components/ProtectedRoute"
import TransactionTable from "./pages/TransactionTable"
import TransactionForm from "./pages/TransactionForm"
import SupplyChainForm from "./pages/SupplyChainForm"
import PreviousBatchesPage from "./pages/PreviousBatchesPage"
import SearchProductsPage from "./pages/SearchProductsPage"
import ProductDetails from "./pages/ProductDetailsPage"
import BlockchainTable from "./pages/BlockchainPage"
import BlockDetailsPage from "./pages/BlockDetailsPage"
import CreateBlock from "./pages/PendingBlockPage"
import DashboardPage from "./pages/DashboardPage"
import RecordTable from "./pages/RecordTable"
import UserTable from "./pages/UserTable"
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
            <Route exact path="/signup" component={SignUpPage} />
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
              component={PreviousBatchesPage}
            />
            <ProtectedRoute
              exact
              path="/products"
              component={SearchProductsPage}
            />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductDetails}
            />
            <ProtectedRoute
              exact
              path="/blockchain"
              component={BlockchainTable}
            />
            <ProtectedRoute
              exact
              path="/block/:id"
              component={BlockDetailsPage}
            />
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
