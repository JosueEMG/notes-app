import React, { useState } from 'react'
import { Link, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { NoteDetail } from './components/NoteDetail'
import { StyledLink } from './components/StyledLink'
import useNotes from './hooks/useNotes'
import { useUser } from './hooks/useUser'
import Notes from './Notes'
import {
  getAll as getAllNotes,
  setToken
} from './services/notes'

const Home = () => <h1>Home page</h1>

const Users = () => <h1>Users</h1>

const inlineStyles = {
  padding: 5
}

const App = () => {
  const { notes } = useNotes()
  const [errorMessage, setErrorMessage] = useState(null)
  const { user } = useUser()

  const saveTokenInLocalStorage = (user) => {
    window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
    setToken(user.token)
  }

  return (
    <BrowserRouter>
      <header>
        <StyledLink to='/' style={inlineStyles}>
          Home
        </StyledLink>
        <StyledLink to='/notes' style={inlineStyles}>
          Notes
        </StyledLink>
        <StyledLink to='/users' style={inlineStyles}>
          Users
        </StyledLink>
        {
          user 
            ? <em>Logged as {user.name}</em> 
            : <StyledLink variant='bold' to='/login'>
                Login
              </StyledLink>
        }
        
      </header>
      <Switch>
        <Route path='/login' render={() => {
          return user ? <Redirect to="/" /> : <LoginForm saveTokenInLocalStorage={saveTokenInLocalStorage} setErrorMessage={setErrorMessage} />
        }}>
        </Route>
        <Route path='/notes/:noteId'>
          <NoteDetail notes={notes} />
        </Route>
        <Route path='/notes'>
          <Notes />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App