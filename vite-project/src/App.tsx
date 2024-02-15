import { useState } from 'react';
import './App.css';


function App() {
  let [counter, setCounter] = useState(15)
  // let counter = 15;
  // setCounter is a method which control the counter variable

  const addValue = () => {
    if(counter !== 20) {
      setCounter(counter + 1);
    }
  }

  const removeCounter = () => {
    if(counter !== 0) {
      setCounter(counter -1);
    }
  }

  return (
    <>
      <h1>Gaurav</h1>
      <h2>count Number: {counter}</h2>
      <button 
      onClick={addValue}
      >addValue {counter}</button>
      <button 
      onClick={removeCounter}
      >removeValue</button>

      <p>{counter}</p>
    </>
  )
}

export default App
