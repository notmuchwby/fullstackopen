const DisplayPersons = ({persons, findPerson, removePerson}) => {
    // Display all people if input field is empty
    if(findPerson === '') {
      return (
        <div>
          {persons.map(person => <p key={person.name}>{person.name} {person.number} 
          <button onClick={() => removePerson(person.id)}>delete</button></p>)}
        </div>
      )
    }
    // Displays people that have same characters in the list
    else {
      const foundPeople = persons.filter(person => person.name.toLowerCase().includes(findPerson.toLowerCase()))
      return (
        <div>
         {foundPeople.map(person => <p key={person.name}>{person.name} {person.number}
         <button onClick={() => removePerson(person.id)}>delete</button> </p>)}
        </div>
      )
    }
  }


export default DisplayPersons