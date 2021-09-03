import React, { useState, useEffect } from 'react'
import DisplayPersons from './components/display'
import FilterPersons from './components/filter'
import AddPersonsForm from './components/add'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findPerson, setFindPeson ] = useState('')

  const fetchPersons = () => {
    personService.getAll().then(setPersons)
  }

  useEffect(fetchPersons, [])

  const deletePerson = (id) => {
    if (window.confirm("Do you want to delete this person?")) {
      personService.deletePerson(id)
      fetchPersons()
    }
  }

  const addPerson = (event) => {
    console.log("it works")
    event.preventDefault();
    const samePerson = persons.some(person => person.name === newName)
    const sameNumber = persons.some(person => person.number === newNumber)

    const newPerson = {
      name: newName, 
      number: newNumber
    }

    if(samePerson || sameNumber) {
      alert("that name or the phone is already in a phonebook")
      setNewName('');
      setNewNumber('');
    } else {
      personService.createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
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


  return (
    <div>
      <div>
        <h2>Phonebook</h2>     
        </div>
        <FilterPersons persons={persons} findPerson={findPerson} handleFindPerson={handleFindPerson} />

        <h2>add a new</h2>
        <AddPersonsForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
        handleAddName={handleAddName} handleAddNumber={handleAddNumber}/>
        
        <h2>Numbers</h2>
        <DisplayPersons persons={persons} findPerson={findPerson} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
