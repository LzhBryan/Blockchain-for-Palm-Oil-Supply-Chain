import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(
  <div>
    <button onClick={handleClicked}>Click Me</button>
    <h1>Hello from React</h1>
    <a href="http://localhost:5000">Local host</a>
  </div>,
  document.getElementById("root")
)

function handleClicked() {
  console.log("Hello World")
}
