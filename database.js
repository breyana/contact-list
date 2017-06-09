const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts'
const client = new pg.Client(connectionString)
client.connect()

const query = (sql, variables, callback) => {
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, (error, result) => {
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    } else {
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
    // return JSON.stringify(result.rows)
  })
}

const getContacts = (callback) => {
  query('SELECT * FROM contacts ORDER BY name', [], callback)
}

const getOneContact = (callback, id) => {
  query('SELECT * FROM contacts WHERE id = $1', [id], callback)
}

const addNewContact = (callback, contact) => {
  query('INSERT INTO contacts(name, email, phone, street, city, state, country, zip, birthday, website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
    [
      contact.name,
      contact.email,
      contact.phone,
      contact.street,
      contact.city,
      contact.state,
      contact.country,
      contact.zip,
      contact.birthday,
      contact.website
    ], callback)
}
module.exports = {
  getContacts,
  getOneContact,
  addNewContact
}
