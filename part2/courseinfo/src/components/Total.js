const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
export default Total