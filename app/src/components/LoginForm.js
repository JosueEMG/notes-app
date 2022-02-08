import React, { useState } from 'react'
import Toggable from './Toggable'
import { login } from '../services/login'
import PropTypes from 'prop-types'

export default function LoginForm ({ saveTokenInLocalStorage, setErrorMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await login({
        username,
        password
      })
      saveTokenInLocalStorage(user)
    } catch (error) {
      console.log(error)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Toggable buttonLabel='Show login'>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input type='text' value={username} placeholder='Username' onChange={handleUsernameChange} />
          </div>
          <div>
            <input type='password' value={password} placeholder='Password' onChange={handlePasswordChange} />
          </div>
          <button id='form-login-button'>
            Login
          </button>
        </form>
      </div>
    </Toggable>
  )
}

LoginForm.propTypes = {
  saveTokenInLocalStorage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}
