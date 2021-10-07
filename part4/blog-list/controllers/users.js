const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const middleware = require('../utils/middleware')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, url: 1, author: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    // const body = request.body
    const { username, name, password } = request.body

    if (password.length < 3) {
        response.status(300).send({ error: 'password must be at least 3 characters' })
        return
    }

    const salt = await bcrypt.genSalt()    
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        name,
        passwordHash,
    })
    
    const savedUser = await user.save()
    
    response.json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

module.exports = usersRouter

