import React from "react"

function StatusBar(props) {
    return (<div className="Outside">
        <div className="Container" 
            style={{width: props.width.toString().concat('%')}}>  
        </div>
    </div>)
}

export default StatusBar