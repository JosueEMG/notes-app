import React, { useState } from 'react'
import Toggable from './Toggable'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { Button, Form } from 'react-bootstrap'

export default function LoginForm ({ setErrorMessage }) {
  const history = useHistory()
  const { login } = useUser()
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
      login({ username, password })
      history.push('/notes')
    } catch (error) {
      console.log(error)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  return (
    //<Toggable buttonLabel='Show login'>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group id='username'>
            <Form.Control 
              type='text' 
              value={username} 
              name='Username'
              placeholder='Username' 
              onChange={handleUsernameChange} />
          </Form.Group>
          <Form.Group id='password'>
            <Form.Control 
              type='password' 
              value={password} 
              name='Password'
              placeholder='Password' 
              onChange={handlePasswordChange} />
          </Form.Group>
          <Form.Group>
            <Button id='form-login-button'>
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    //</Toggable>
  )
}

LoginForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired
}
