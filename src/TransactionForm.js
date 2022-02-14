import React, { Component } from "react"
import axios from "axios"
import history from "./History"

class TransactionForm extends Component {
  constructor(props) {
    super(props)
    this.onChangeFrom = this.onChangeFrom.bind(this)
    this.onChangeTo = this.onChangeTo.bind(this)
    this.onChangeAmount = this.onChangeAmount.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      from: "",
      to: "",
      amount: "",
    }
  }

  onChangeFrom(e) {
    this.setState({
      from: e.target.value,
    })
  }

  onChangeTo(e) {
    this.setState({
      to: e.target.value,
    })
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const transaction = {
      from: this.state.from,
      to: this.state.to,
      amount: this.state.amount,
    }
    console.log(transaction)

    axios
      .post("http://localhost:5000/transaction", transaction)
      .then((res) => console.log(res.data))

    this.setState({
      from: "",
      to: "",
      amount: "",
    })
    window.location = "/Create/Encrypt"
  }

  /*const [input, setInput] = useState({
    from: "",
    to: "",
    amount: "",
  })

  function handleChange(event) {
    const { name, value } = event.target
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      }
    })
  }

  function handleClick(event) {
    event.preventDefault()
    const newTransaction = {
      from: input.from,
      to: input.to,
      amount: input.amount,
    }
    axios.post("http://localhost:3001/create", newTransaction)
  }*/

  render() {
    return (
      <div className="create--form">
        <h2>Create your transactions here</h2>
        <form className="form" onSubmit={this.onSubmit}>
          <label className="formLabel">From Address</label>
          <input
            onChange={this.onChangeFrom}
            name="from"
            type="text"
            value={this.state.from}
            className="formInput"
            placeholder="Enter public key"
          ></input>

          <label className="formLabel">To Address</label>
          <input
            onChange={this.onChangeTo}
            name="to"
            type="text"
            value={this.state.to}
            className="formInput"
            placeholder="Enter public key"
          ></input>

          <label className="formLabel">Amount</label>
          <input
            onChange={this.onChangeAmount}
            name="amount"
            type="number"
            value={this.state.amount}
            className="formInput"
            placeholder="Enter amount"
          ></input>

          <input type="submit" value="Sign & Create" className="create-btn" />

          {/*<button className="create-btn" onClick={handleClick}>
          Sign & Create
  </button>*/}

          <button className="cancel-btn" onClick={() => history.push("/")}>
            Cancel
          </button>
        </form>
      </div>
    )
  }
}

export default TransactionForm
