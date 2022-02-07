import React, { useState, useRef } from 'react'
import Toggable from './Toggable'

export default function NoteForm ({ handleLogout, addNote }) {
  const [newNote, setNewNote] = useState('')
  const toggableRef = useRef()

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    toggableRef.current.toggleVisibility()
  }

  return (
    <Toggable buttonLabel='Show Create Note' ref={toggableRef}>
      <h3>Create a new note</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleChange} value={newNote} placeholder='Write your note content' />
        <button>Save</button>
      </form>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Toggable>
  )
}
