import React from "react"
import AddProcess from "../AddProcess/AddProcess"
import Sidebar from "../Sidebar/Sidebar"
import { Link } from "react-router-dom"
import { MdPendingActions } from "react-icons/md"
import "./userPage.css"

const UserPage = () => {
  return (
    <div>
      <div>
        <Link to={"/create"}>
          <button className="transaction">TRANSACTION</button>
        </Link>
      </div>
      <AddProcess />
      <div>
        <Link to="/blocks">
          <button className="viewBlocks">VIEW BLOCKS</button>
        </Link>
      </div>
      <Sidebar />
      <div>
        <Link to="/transactions">
          <MdPendingActions
            style={{ fontSize: "3.5rem", position: "relative", left: "80%" }}
          />
        </Link>
      </div>
    </div>
  )
}

export default UserPage
