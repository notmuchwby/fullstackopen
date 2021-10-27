import React, {useState } from 'react'
import likeService from '../services/likes'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs, blogs, user}) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (id, newObject) => {
    likeService.likes(id, newObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const removeBlog = (id, user) => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(id, user)
    }
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
          <button onClick={toggleVisibility} className='view'>view</button>
        </div>
        <div style={showWhenVisible} className={'blog'}>
          <div>
            {blog.title}
            <button onClick={toggleVisibility}>hide</button>
          </div>
            <p>{blog.author}</p>
            <div>
              likes {blog.likes}
              <button onClick={() => addLike(blog.id, blog)} className='likeButton'>like</button>
            </div>
            <p>{blog.url}</p>
            <button onClick={() => removeBlog(blog.id, user)}>remove</button>
        </div>
      </div>  
  )
}

export default Blog