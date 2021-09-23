const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://phonebookapp:${password}@persons.dnbt8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person', personSchema)


const person = new Person({
    name: process.argv[3],
    number : process.argv[4]
})

if(process.argv.length === 3) {   
    Person.find({}).then(result => {
        console.log("phonebook: ")
        result.forEach(person => {
          console.log(person.name, person.number)
          mongoose.connection.close()
        })        
      })
} else {
    person.save().then(result => {
        console.log("Person is saved")
        mongoose.connection.close()
    })    
}



