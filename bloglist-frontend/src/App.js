import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import useField from './hooks/index'
import PropTypes from 'prop-types'
import './App.css'

function App () {
  const [blogs, setBlogs] = useState([])
  const usernameState = useField('text')
  const passwordState = useField('password')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    const username = usernameState.value
    const password = passwordState.value
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`${user.name} logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      usernameState.reset()
      passwordState.reset()
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const Error = ({ errorMessage }) => {
    if (errorMessage !== null) {
      return (
        <div className="error">
          {errorMessage}
        </div>
      )
    } else {
      return (
        null
      )
    }
  }

  const Notification = ({ message }) => {
    if (message !== null) {
      return (
        <div className="notification">
          {message}
        </div>
      )
    } else {
      return (
        null
      )
    }
  }

  const handleBlogChange = (event) => {
    addBlog(event)
  }

  const logout = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
  }

  blogs.sort((a, b) => b.likes - a.likes)

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      like={likeBlog}
      remove={removeBlog}
      user={user}
    />
  )

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setMessage(`${title} by ${author} created`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  const likeBlog = (blog) => {
    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    blogService
      .update(blogObject)
      .then(data => {
        setBlogs(blogs.map(b => b.id !== data.id ? b : data))
        setMessage(`you liked ${data.title}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const removeBlog = (blog) => {
    const blogObject = {
      token: `bearer ${user.token}`,
      id: blog.id
    }

    try {
      blogService
        .remove(blogObject)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
          setBlogs(blogs.filter(b => b.id !== blog.id))
          setMessage(`${blog.title} removed`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    } catch (exception) {
      console.log(exception)
    }
  }

  useEffect(async () => {
    const result = await blogService
      .getAll()
    return setBlogs(result)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  Notification.propTypes = {
    message: PropTypes.string
  }

  return (
    <div className="App">
      <Error errorMessage={errorMessage}/>
      <Notification message={message}/>

      {user === null
        ? <div>
          <h1>log in to application</h1>
          <LoginForm
            username={usernameState}
            password={passwordState}
            handleLogin={handleLogin}/>
        </div>
        : <div>
          <h1>blogs</h1>
          <p>{user.name} logged in</p>
          <form onSubmit={logout}>
            <button>log out</button>
          </form>
          <ul>
            {rows()}
          </ul>
          <Togglable buttonLabel='add new' ref={blogFormRef}>
            <NewBlogForm handleBlogChange={handleBlogChange}
              title={title} author={author} url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}/>
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App
