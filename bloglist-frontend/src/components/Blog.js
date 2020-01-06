import React, { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const [longForm, setLongForm] = useState(false)

  const DeleteButton = () => {
    if (blog.user.id === user.id) {
      return (
        <div>
          <button onClick={() => remove(blog)}>remove</button><br></br>
        </div>
      )
    } else {
      return (
        null
      )
    }
  }

  if (longForm) {
    return (
      <div onClick={() => setLongForm(!longForm) } >
        {blog.title} {blog.author}<br></br>
        {blog.url}<br></br>
        {blog.likes} likes <button onClick={() => like(blog)}>like</button><br></br>
        added by {blog.user.name}<br></br>
        {DeleteButton()}
      </div>
    )
  } else {
    return (
      <div onClick={() => setLongForm(!longForm)} className='shortForm'>
        {blog.title} {blog.author}
      </div>
    )
  }
}

export default Blog
