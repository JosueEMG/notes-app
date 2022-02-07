import './styles/styles.css'
import { useEffect ,useState } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import { 
    create as createNote, 
    getAll as getAllNotes,
    update as updateNote,
    setToken
} from './services/notes'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

export default function App() {

    const [notes, setNotes] = useState([])
    
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const [user, setUser] = useState(null)


    useEffect(() => {
        getAllNotes()
            .then(notes => {
                setNotes(notes)
            })
    }, [])

    const handlelogout = () => {
        setUser(null)
        setToken(user.token)
        window.localStorage.removeItem('loggedNoteAppUser')
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setToken(user.token)
        }
    }, [])

    const addNote = (noteObject) => {
        createNote(noteObject)
            .then(returnedNote => {
                setNotes(prevNotes => prevNotes.concat(returnedNote))
            })
            .catch(error => {
                setErrorMessage('La API ha petado')
            })
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
    
        updateNote(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)   
            })
    }

    const saveTokenInLocalStorage = (user) => {

        window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
        setToken(user.token)
        setUser(user)
        
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)
    
    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            {
                user 
                    ? <NoteForm addNote={addNote} handleLogout={handlelogout} />
                    : <LoginForm saveTokenInLocalStorage={saveTokenInLocalStorage} setErrorMessage={setErrorMessage} />
            }

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
                </button>
            </div>  
            <ul>
                {notesToShow.map((note, i) => (
                    <Note 
                        key={i} 
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul> 
        </div>
    )
}


