import React, { Component } from "react"
import "./addProcess.css"

class AddProcess extends Component {
  constructor(props) {
    super(props)
    this.state = { showAddForm: false }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState({ showAddForm: true })
  }

  renderAddForm() {
    return (
      <div>
        <form className="addForm">
          <label className="formLabel">Supply Chain Activity Details</label>
          <textarea
            type="text"
            className="formTextArea"
            placeholder="Enter text here..."
          ></textarea>

          <button className="broadcast">Broadcast</button>
        </form>
      </div>
    )
  }

  render() {
    const { showAddForm } = this.state

    return (
      <div>
        <button className="addProcess" onClick={this.onClick}>
          ADD PROCESS
        </button>
        {showAddForm && this.renderAddForm()}
      </div>
    )
  }
}

export default AddProcess
