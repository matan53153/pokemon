import React from "react"
import "./App.css"


function Name(props) {
    return (<div >
        <span className="DisplayName">{props.name}</span>
    </div>)
}

export default Name