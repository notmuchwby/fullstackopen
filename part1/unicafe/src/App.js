import React, { useState } from 'react'


const Button = ({onClick, text}) => {
  
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, bad, neutral}) => {  
  
  let average = 0
  let positive = 0
  let total = good + bad + neutral 

  if(total > 0) { 
      average = (good - bad) / total
      positive = good / total  * 100 
  }

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average} </p>
      <p>positive {positive} % </p>
    </div>
  )
}


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => setGood(good + 1)
  const neutralFeedBack = () => setNeutral(neutral + 1)
  const badFeedBack = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={goodFeedback} text='good'/>
      <Button onClick={neutralFeedBack} text='neutral'/>
      <Button onClick={badFeedBack} text='bad'/>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App