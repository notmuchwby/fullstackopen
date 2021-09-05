import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newPerson, setNotificationMessage) => {
    const request = axios.post(baseUrl, newPerson)
    setNotificationMessage(`Added ${newPerson.name}`)
    setTimeout(() => {
        setNotificationMessage(null)
    }, 5000)
    return request.then(response => response.data)
}

const deletePerson = (id, setNotificationMessage) => {
    axios.delete(`${baseUrl}/${id}`)
    .catch(error => {
       setNotificationMessage("This person has already been deleted")
    })
}

const changeNumber = (id, persons, newNumber, setPersons, setNotificationMessage) => {
    const personToChange = persons.find(person => person.id === id)
    const changedPersons = {...personToChange, number: newNumber}

    return axios.put(`${baseUrl}/${id}`, changedPersons)
    .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
        setNotificationMessage('Phone number has been changed!')
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    })
    
}

const personService = {getAll, createPerson, deletePerson, changeNumber}
export default personService