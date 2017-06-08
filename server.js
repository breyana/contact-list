const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  database.getContacts((error, contacts) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.render('index', {
        contacts: contacts,
      })
    }
  })
})

app.get('/contacts/:id', (request, response) => {
  database.getOneContact((error, contact) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.render('contact', {
        contact: contact,
      })
    }
  }, request.params.id)
})

app.post('/contacts/new', (request, response) => {
  database.addNewContact((error, contact) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
      })
    } else {
      response.status(201).json({
        contact: contact[0]
      })
    }
  }, request.body)
})

app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
