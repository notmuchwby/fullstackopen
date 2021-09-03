import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)    
}

const changeNumber = (id, persons, newNumber, setPersons) => {
    const personToChange = persons.find(person => person.id === id)
    const changedPersons = {...personToChange, number: newNumber}

    return axios.put(`${baseUrl}/${id}`, changedPersons)
    .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
    })
}

const personService = {getAll, createPerson, deletePerson, changeNumber}
export default personService