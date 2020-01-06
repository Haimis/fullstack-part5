import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ handleBlogChange, title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange }) => {
  return (
    <div>
      <h1>create new blog</h1>
      <form onSubmit={handleBlogChange}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleBlogChange: PropTypes.func,
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  handleTitleChange: PropTypes.func,
  handleAuthorChange: PropTypes.func,
  handleUrlChange: PropTypes.func
}

export default NewBlogForm
