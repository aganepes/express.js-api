const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const dotenv=require('dotenv').config()
const connectMongoDB=require('./Config/MongoDB')

const app = express()
const port = process.env.PORT || 3000

connectMongoDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/contacts', require('./routes/contact'))
app.use('/api/users',require('./routes/users'))

app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))