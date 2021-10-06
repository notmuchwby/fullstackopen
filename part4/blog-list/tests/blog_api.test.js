const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')



beforeEach(async() => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialNotes)
      })
})


test('returns all blogs in the list', async() => {
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(helper.initialBlog.length)
})

test('each blog has a unique id', async() => {
    const result = await api.get('/api/blogs')
    expect(result.body.map(blog => blog.id)).toBeDefined()
})

test('succesfully added a new blog to blog list', async() => {
    const newBlog = {
        title: "test blog",
        author: "test author",
        url: "test url",
        likes: 4,
        id: "test123123123id123123"
    }

    await api.post('/api/blogs').send(newBlog)
    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(helper.initialBlog.length + 1)

    const contents = result.body.map(blog => blog.title)
    expect(contents).toContain('test blog')
})

// test('blog must contain title or url', async() =>{
//     const newBlog = {
//         author: "test author",
//         likes: 4,
//         id: "test123123123id123123"
//     }

//     await api.post('/api/blogs')
//              .send(newBlog)
//              .expect(400)
    
//     const currentBlog = await api.get('/api/blogs')
//     expect(currentBlog).toHaveLength(helper.initialBlog)
    
// })

// test('deleting a single blog', async() => {
//     const blogsAtStart = await helper.blogsInDb()
//     const blogtoDelete = blogsAtStart[0]

//     console.log(blogsAtStart)

//     await api.delete(`/api/blogs/${blogtoDelete.id}`).expect(204)
//     const blogsAtEnd = await helper.blogsInDb()

//     expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)
// })

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })
