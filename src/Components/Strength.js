import React from "react"
import "./App.css"
import StatusBar from "./StatusBar"

function Strength(props) {

    
    return (<div className="ForStrength">
        <div className="Container" 
            style={{width: props.hp === 'None' ? "0px" : (props.hp).toString().concat('%')}}>  
        </div>
        <div className="Container" 
            style={{width: props.attacks === 0 ? "0px" : (props.attacks)}}>
        </div>
        <div className="Container" 
            style={{width: props.weaknesses === '0%' ? "0px" : (props.weaknesses)}}>
        </div>
        
        </div>)
}

export default Strength
