import React, { Component } from "react"
import Transaction from "../TransactionBtn/TransactionBtn"
import AddProcess from "../AddProcess/AddProcess"
import ViewBlocks from "../ViewBlocks/ViewBlocks"
import Sidebar from "../Sidebar/Sidebar"
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
