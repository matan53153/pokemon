import React from "react"
import Name from "./Name"
import DisplayImage from "./DisplayImage"
import DisplayHP from "./DisplayHP"
import Strength from "./Strength"
import Weaknesses from "./Weaknesses"
import Damage from "./Damage"
import Happiness from "./Happiness.js"
import "./App.css"
import StatusBar from "./StatusBar"



function Block(props) {
    const { onClick = () => null } = props
    return (<div className="HoverForAdding"  id={props.id} value={props.value}>
        <p className="button" onClick={onClick}>{props.Current === true ? 'Remove' : "Add"}</p>
        <span className="DisplayTrueName">{props.name}</span>
        <DisplayImage imageUrl = {props.imageUrl}/>
        <div className="BlockL">
        <div>
            <p className="DisplayName" >Hp</p>
            <p className="DisplayName">Strength</p>
            <p className="DisplayName">Weakness</p>
        </div>
        <div>
        <StatusBar width={props.hp} />
        <StatusBar width={props.attacks} />
        <StatusBar width={props.weaknesses} />
        </div>
        </div>
    </div>)

}

export default Block