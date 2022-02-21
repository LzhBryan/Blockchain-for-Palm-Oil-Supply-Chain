import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./style.css"

const Modal = ({ transaction }) => {
  return (
    <div className="modalBg">
      <div className="modalContainer">
        <Link to={"/"} className="exit-btn">
          ×
        </Link>
        <h2 className="header">Transaction Completed</h2>
        <h3 className="label">Sender's Address:</h3>
        <p className="content">{transaction.fromAddress}</p>
        <h3 className="label">Receiver's Address:</h3>
        <p className="content">{transaction.toAddress}</p>
        <h3 className="label">Amount:</h3>
        <p className="content">{transaction.amount}</p>
        <h3 className="label">Signature:</h3>
        <p className="content">{transaction.signature}</p>
        <h3 className="label">Timestamp:</h3>
        <p className="content">{transaction.timestamp}</p>
      </div>
    </div>
  )
}

export default Modal
