const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const app = express()
const port = 4000

// Allow cross-origin requests
app.use(cors())

// Connect to MongoDB
const hostname = process.env.DB_HOSTNAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE

const connectionString = `${hostname}://${username}:${password}@cluster0.c3vlt.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true
})

mongoose.connection.once('open', () => {
	console.log('Connected to DB')
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}))



app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})

