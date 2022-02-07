require('dotenv').config()
require('./mongo')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const express = require('express')
const app = express()
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')
const { notesRouter, usersRouter, loginRouter } = require('./controllers/index.routes')

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))

Sentry.init({
	dsn: "https://97820cfe510b4c268573562f968638bf@o1112934.ingest.sentry.io/6142824",
	integrations: [
	  // enable HTTP calls tracing
	  new Sentry.Integrations.Http({ tracing: true }),
	  // enable Express.js middleware tracing
	  new Tracing.Integrations.Express({ app }),
	],
  
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notes', notesRouter)

if (process.env.NODE_ENV === 'test') {
	const { testingRouter } = require('./controllers/index.routes')
	app.use('/api/testing', testingRouter)
}

app.use(notFound)

app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

module.exports = {
	app, 
	server
}

