import React, { Component } from "react"
import "./style.css"

class Encrypt extends Component {
  render() {
    return (
      <div className="create--form">
        <h2>Transaction completed!</h2>
        <h4>Transaction details</h4>
        <h4>Hash value</h4>
        <button className="encrypt-btn">Encrypt</button>
        <h4>Encrypted value</h4>
      </div>
    )
  }
}

export default Encrypt
