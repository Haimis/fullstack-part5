import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin }) => {
  delete username.reset
  delete password.reset

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username}/>

      </div>
      <div>
        password
        <input {...password}/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  password: PropTypes.object,
  username: PropTypes.object,
  handleLogin: PropTypes.func
}

export default LoginForm
