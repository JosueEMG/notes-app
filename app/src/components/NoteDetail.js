import React from 'react'
import { useParams } from 'react-router-dom'

export const NoteDetail = ({ notes }) => {
  const { noteId } = useParams()
  const note = notes.find(note => note.id === noteId)

  if (!note) return null 

  console.log(note)
  
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user.name}</div>
      <div>
        <strong>
          { note.important ? 'important' : 'not important' }
        </strong>
      </div>
    </div>
  )
}