import React, { Component } from "react"
import Transaction from "../TransactionBtn/transactionBtn"
import AddProcess from "../AddProcess/addProcess"
import ViewBlocks from "../ViewBlocks/viewBlocks"
import Sidebar from "../Sidebar/sidebar"
import { Link } from "react-router-dom"
import { MdPendingActions } from "react-icons/md"

class UserPage extends Component {
  render() {
    return (
      <div>
        <Transaction />
        <AddProcess />
        <ViewBlocks />
        <Sidebar />
        <div>
          <Link to="/Transactions">
            <MdPendingActions
              style={{ fontSize: "3.5rem", position: "relative", left: "80%" }}
            />
          </Link>
        </div>
      </div>
    )
  }
}

export default UserPage
