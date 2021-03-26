const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/Userdb'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Database connected...')
})

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users',userRouter)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})