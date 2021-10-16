import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: blogAuthor,
      url: blogUrl,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNotification('blog-added')
          setNewBlog('')
          setBlogAuthor('')
          setBlogUrl('')
        })
    
    setTimeout(() => {
      setNotification(null)    
    }, 5000)
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setNewBlog(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setBlogUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      // console.log(JSON.stringify(user))
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      // console.log(window.localStorage.getItem('loggedBlogappUser'))

      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setNotification('error')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      />   
    </Togglable>
  )

  const blogForm = () => ( 
   <Togglable buttonLabel="create blog">
     <BlogForm
        addBlog={addBlog}
        newBlog={newBlog}
        handleTitleChange={handleTitleChange}
        blogAuthor={blogAuthor}
        handleAuthorChange={handleAuthorChange}
        blogUrl={blogUrl}
        handleUrlChange={handleUrlChange}
     /> 
   </Togglable>
  )

  return ( 
    <div>
      <Notification notification={notification} />

      <h2>blogs</h2>
      
      {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged in <button onClick={() => window.localStorage.clear()}>log out</button></p>
          {blogForm()}

          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
     
    </div>
  )
}

export default App