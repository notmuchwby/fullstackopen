import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const addName = (event) => {
    event.preventDefault();
    const samePerson = persons.some(person => person.name === newName)
    const sameNumber = persons.some(person => person.number === newNumber)

    if(samePerson || sameNumber) {
      alert(newName + " is already in a phonebook, or " + newNumber + " is already used")
      setNewName('');
      setNewNumber('');
    } else {
      setPersons(persons.concat({ name: newName ,
                                  number : newNumber}))
      setNewName('');
      setNewNumber('');
    }  
  }

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }


  
  const DisplayPersons = ({persons}) => {
    return (
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleAddName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleAddNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons}/>
    </div>
  )
}

export default App
