import personService from "../services/persons"

const deletePerson = (id) => {
    const result = window.confirm("Do you want to delete this person?")
    if(result === true) {
        personService.deletePerson(id)
    } else {

    }
}

export default deletePerson