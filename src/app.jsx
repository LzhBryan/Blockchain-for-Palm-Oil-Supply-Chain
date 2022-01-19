import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <div>
        <button onClick={ handleClicked }>Click Me</button>
        <h1>Hello from React</h1>
    </div>
    , document.getElementById('root')
)

function handleClicked(){
    console.log('Hello World')
}
