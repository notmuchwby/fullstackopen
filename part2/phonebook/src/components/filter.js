const FilterPersons = ({persons, findPerson, handleFindPerson}) => {
    return (
      <div>
        filter shown with<input persons={persons} value={findPerson} onChange={handleFindPerson}/>
      </div>
    )
  }
  
export default FilterPersons  