import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      <Link to={`/notes/${note.id}`}>{note.content}</Link>
      <Button onClick={toggleImportance}>{label}</Button>
    </li>
  )
}

export default Note
