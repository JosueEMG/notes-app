const mongoose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/Note')

const { initialNotes, api, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // parallel
  // const notesObjects = initialNotes.map(note =>  new Note(note))
  // const promises = notesObjects.map(note => note.save())
  // await Promise.all(promises)

  // sequential
  for (const note of initialNotes) {
    const newObject = new Note(note)
    await newObject.save()
  }
})

describe('GET all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes/')
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('thie first note is about midudev', async () => {
    const { contents } = await getAllContentFromNotes()

    expect(contents[0]).toBe(contents[0])
  })
})

describe('POST notes', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'Proximamente async/await',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const { contents, response } = await getAllContentFromNotes()

    expect(response.body).toHaveLength(initialNotes.length + 1)

    expect(contents).toContain(newNote.content)
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('nulleable note is not added', async () => {
    const newNote = null

    api
      .post('/api/notes')
      .send(newNote)
      .expect(404)

    const { response } = await getAllContentFromNotes()

    expect(response.body).toHaveLength(initialNotes.length)
  })
})

test('a note can be deleted', async () => {
  const { response: firstResponse } = await getAllContentFromNotes()
  const { body: notes } = firstResponse
  const [noteToDeleted] = notes

  await api
    .delete(`/api/notes/${noteToDeleted.id}`)
    .expect(204)

  const { contents, response: secondResponse } = await getAllContentFromNotes()

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)

  expect(contents).not.toContain(noteToDeleted.content)
})

test('a note can not be deleted', async () => {
  await api
    .delete('/api/notes/1234')
    .expect(400)

  const { response } = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
