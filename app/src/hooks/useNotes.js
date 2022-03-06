import { useState, useEffect } from 'react'
import { getAll as getAllNotes, update as updateNote, create as createNote } from '../services/notes'

export default function useNotes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getAllNotes()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (noteObject) => {
    createNote(noteObject)
      .then(returnedNote => {
        setNotes(prevNotes => prevNotes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    return updateNote(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }

  return {
    notes,
    addNote,
    toggleImportanceOf
  }
}