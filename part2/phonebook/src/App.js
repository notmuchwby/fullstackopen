import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findPerson, setFindPeson ] = useState('')


  const addName = (event) => {
    event.preventDefault();
    const samePerson = persons.some(person => person.name === newName)
    const sameNumber = persons.some(person => person.number === newNumber)

    if(samePerson || sameNumber) {
      alert("that name or the phone is already in a phonebook")
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

  const handleFindPerson = (event) => {
    console.log(event.target.value)
    setFindPeson(event.target.value)  
  }



  
  const DisplayPersons = ({persons}) => {
    if(findPerson === '') {
      return (
        <div>
          {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
      )
    } else {
      const foundPeople = persons.filter(person => person.name.toLowerCase().includes(findPerson.toLowerCase()))
      return (
        <div>
         {foundPeople.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
      )
    }
  }

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        filter shown with<input value={findPerson} onChange={handleFindPerson}/>
      </div>
      <h2>add a new</h2>
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
