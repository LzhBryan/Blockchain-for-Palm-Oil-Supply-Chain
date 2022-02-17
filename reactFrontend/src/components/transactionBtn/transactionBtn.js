import React, { Component } from "react"
import "./style.css"
import history from "../routes/history"

class Transaction extends Component {
  /*const [transPopup, setTransPopup] = useState(false)*/
  render() {
    return (
      <div>
        <button className="transaction" onClick={() => history.push("/Create")}>
          TRANSACTION
        </button>

        {/*<TransPopup trigger={transPopup}>
        <h2>Create your transactions here</h2>
        <form className="form">
          <label className="formLabel">From Address</label>
          <input
            type="text"
            className="formInput"
            placeholder="Enter public key"
          ></input>

          <label className="formLabel">To Address</label>
          <input
            type="text"
            className="formInput"
            placeholder="Enter public key"
          ></input>

          <label className="formLabel">Amount</label>
          <input
            type="number"
            className="formInput"
            placeholder="Enter amount"
          ></input>

          <button className="create-btn">Sign & Create</button>
          <button className="close-btn" onClick={() => setTransPopup(false)}>
            Close
          </button>
        </form>
  </TransPopup>*/}
      </div>
    )
  }
}

export default Transaction
