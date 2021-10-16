import React from 'react'

const BlogForm = ({
    addBlog, 
    newBlog,
    handleTitleChange,
    blogAuthor, 
    handleAuthorChange, 
    blogUrl, 
    handleUrlChange
    }) => {

    return (
        <div>
        <form onSubmit={addBlog}>
      <div>
        title: 
        <input
          value={newBlog}
          name="title"
          onChange={handleTitleChange}
        />
      </div>

      <div>
        author:
        <input
          value={blogAuthor}
          name="title"
          onChange={handleAuthorChange}
        />
      </div>

      <div>
        url:
        <input 
          value={blogUrl}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">submit</button>
    </form>
    </div>
    )
}

export default BlogForm