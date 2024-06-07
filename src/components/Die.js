import React from "react"
export default function Die(props){
    let classValue = "die-face"
    if (props.isHeld){
        classValue = classValue +" greenBg"
    }
    return(
        <div className={classValue} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
        
    )
}