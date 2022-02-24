import React, { Component } from "react"
import "./sidebar.css"

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="user">
          <h2>User</h2>
        </div>

        <div className="profile">
          <h2 className="profileTitle">Profile</h2>
          <ul className="profileInfo">
            <li>Username</li>
            <li>User location</li>
            <li>User details</li>
            <li>Private key</li>
            <li>Permissions</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Sidebar
