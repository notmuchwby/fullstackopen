import React, {useState} from 'react'
const Blog = ({blog}) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(0)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
              likes {likes}
              <button> like </button>
            </div>
            <p>{blog.url}</p>
        </div>
      </div>  
  )
}

export default Blog