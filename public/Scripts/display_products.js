const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()

app.use(express.json())
var database

app.get('/', (req, resp) => {
    resp.send('Welcome')

})

app.listen(8080, () => {
    MongoClient.connect('mongodb+srv://barcelparts:barcelparts@cluster0.uv4lk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }, (error, result) => {
        if (error) throw error
        database = result.db('Barcelparts')
        console.log('Connection successful')
    })

})


// https://www.youtube.com/watch?v=vcJwAYHaS-k
// video to watch 