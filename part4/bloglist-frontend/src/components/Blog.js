import React, {useState } from 'react'
import blogService from '../services/likes'

const Blog = ({blog, setBlogs, blogs}) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (id, newObject) => {
    blogService.likes(id, newObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div>
            {blog.title}
            <button onClick={toggleVisibility}>hide</button>
          </div>
            <p>{blog.author}</p>
            <div>
              likes {blog.likes}
              <button onClick={() => addLike(blog.id, blog)}> like </button>
            </div>
            <p>{blog.url}</p>
        </div>
      </div>  
  )
}

export default Blog