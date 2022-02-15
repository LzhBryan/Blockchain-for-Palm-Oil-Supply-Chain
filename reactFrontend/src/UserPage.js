import React, { Component } from "react"
import "./style.css"
import Transaction from "./Transaction"
import AddProcess from "./AddProcess"
import ViewBlocks from "./ViewBlocks"
import Sidebar from "./Sidebar"

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
