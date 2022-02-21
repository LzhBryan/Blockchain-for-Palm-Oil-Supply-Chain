import React, { Component } from "react"
import Transaction from "../TransactionBtn/transactionBtn"
import AddProcess from "../AddProcess/addProcess"
import ViewBlocks from "../ViewBlocks/viewBlocks"
import Sidebar from "../Sidebar/sidebar"

class UserPage extends Component {
  render() {
    return (
      <div>
        <Transaction />
        <AddProcess />
        <ViewBlocks />
        <Sidebar />
      </div>
    )
  }
}

export default UserPage
