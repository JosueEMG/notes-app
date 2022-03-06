import { useState, useEffect } from 'react' 
import {
  setToken
} from '../services/notes'
import { login as loginUser } from '../services/login'

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const logout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const login = async ({ username, password }) => {
    const user = await loginUser({
      username,
      password
    })
    
    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(user)
    )

    setUser(user)
  }

  return {
    user,
    logout,
    login
  }
}