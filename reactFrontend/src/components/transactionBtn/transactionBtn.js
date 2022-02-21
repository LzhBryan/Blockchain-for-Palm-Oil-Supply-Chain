import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./style.css"

class Transaction extends Component {
  render() {
    return (
      <div>
        <Link to={"/Create"}>
          <button className="transaction">TRANSACTION</button>
        </Link>
      </div>
    )
  }
}

export default Transaction
