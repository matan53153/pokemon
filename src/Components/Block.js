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
import cute from "./cute.png"



function Block(props) {
    const { onClick = () => null } = props
    let happinessImages
    if (Math.round(props.happiness) === 0) {
        happinessImages = 0
    }
    if (Math.round(props.happiness) === 1) {
        happinessImages = <img className="Happy" src={cute} />
    }
    if (Math.round(props.happiness) === 2) {
        happinessImages = <div><img className="Happy" src={cute} /><img className="Happy" src={cute} /></div>
    }
    if (Math.round(props.happiness) === 3) {
        happinessImages = <div><img className="Happy" src={cute} /><img className="Happy" src={cute} /><img className="Happy" src={cute} /></div>
    }
    return (
        <div className="Block" style={{ width: props.type === "myPoke" ? '50%' : '100%' }}>
            <div className="Separate" >
                <div className="HoverForAdding" id={props.id} value={props.value}>
                    <div className="button" onClick={onClick}>{props.Current === true ? 'Add' : "X"}</div>
                    
                    <div className="PokemonImage">
                        <DisplayImage imageUrl={props.imageUrl} />
                    </div>

                    <div className="DisplayTrueName">{props.name}</div>
                    <div className="BlockL">
                        <div>
                            <p className="DisplayName" >Hp</p>
                            <p className="DisplayName">Str</p>
                            <p className="DisplayName">Weak</p>
                        </div>
                        <div className="bars">
                            <StatusBar width={props.hp} />
                            <StatusBar width={props.attacks} />
                            <StatusBar width={props.weaknesses} />
                        </div>

                    </div>
                    <div>
                        {happinessImages}
                    </div>
                </div>
            </div>

        </div>)

}

export default Block