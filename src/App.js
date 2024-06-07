// import logo from './logo.svg';
import './App.css';
import Die from "./components/Die"
import React from "react"
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"
function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies]=React.useState(false)
  const [numberOfTurns, setNumberOfTurns]=React.useState(0)

  React.useEffect(()=>{
    const allHeld=dice.every(die=>die.isHeld)
    const firstValue=dice[0].value
    const allSameValue=dice.every(die=>die.value===firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You Won!")
    }

  },[dice])

  function generateNewDice(){
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()

    }
  }
  function allNewDice(){
    let newDice=[]
    for(let i=0;i<10;i++){
      newDice.push(generateNewDice());
    }
    return newDice
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDice()
      }))
      setNumberOfTurns(numberOfTurns+1)
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
      setNumberOfTurns(0)
    }
    

  }
  function holdDice(id){
    setDice((oldDice) => oldDice.map(die=>{
      return die.id===id?
      {...die,isHeld:!die.isHeld}:
      die
    }))

      console.log(id)
  }
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)
 
  
  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <div className="turns">
        <h1>Turns: {numberOfTurns}</h1>
        {tenzies && <h2 className="turns-message">You took {numberOfTurns} turns to win!</h2>}
        <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>

      </div>
       </main>
  );
}

export default App;
