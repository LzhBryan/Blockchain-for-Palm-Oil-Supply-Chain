import React, { Component } from "react"
import Transaction from "../transactionBtn/transactionBtn"
import AddProcess from "../addProcess/addProcess"
import ViewBlocks from "../viewBlocks/viewBlocks"
import Sidebar from "../sidebar/sidebar"

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
