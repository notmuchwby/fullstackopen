import React, { useState, useEffect } from 'react'
import DisplayPersons from './components/display'
import FilterPersons from './components/filter'
import AddPersonsForm from './components/add'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findPerson, setFindPeson ] = useState('')
  const [ notification, setNotificationMessage ] = useState(null)

  const fetchPersons = () => {
    personService.getAll().then(setPersons)
  }

  useEffect(fetchPersons, [])

  const removePerson = (id) => {
    if (window.confirm("Do you want to delete this person?")) {
      personService.deletePerson(id, setNotificationMessage)
      fetchPersons()
    }
  }

  const addPerson = (event) => {
    event.preventDefault();
    const sameName = persons.find(person => person.name === newName)
    const sameNumber = persons.find(person => person.number === newNumber)

    if (sameName && sameNumber) {
      alert("The person with the same number already in the phonebook")
      return
    }

    if (sameName) {
      if (window.confirm(`${sameName.name} is already added to the phonebook, want to replace the old number with the new one?`)) {
        personService.changeNumber(sameName.id, persons, newNumber, setPersons, setNotificationMessage)
          setNewName('');
          setNewNumber('');
      }
      return
    }

    const newPerson = {
      name: newName, 
      number: newNumber
    }

    personService.createPerson(newPerson, setNotificationMessage)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
    setNewName('');
    setNewNumber('');

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
        <h2>Phonebook</h2>   
        <Notification message={notification} />
        <FilterPersons persons={persons} findPerson={findPerson} handleFindPerson={handleFindPerson} />

        <h2>add a new</h2>
        <AddPersonsForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
        handleAddName={handleAddName} handleAddNumber={handleAddNumber}/>
        
        <h2>Numbers</h2>
        <DisplayPersons persons={persons} findPerson={findPerson} removePerson={removePerson}/>
    </div>
  )
}

export default App
