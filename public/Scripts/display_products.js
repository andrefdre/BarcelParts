const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()

app.use(express.json())
var database

app.get('/', (req, resp) => {
    resp.sendFile('/Barcelparts/public' + '/Main_Page.html')

})

app.get('/api/Products',(req,resp)=>{

    database.collection('Products').find({}).toArray((err,result) =>{
        if(err) throw err
        resp.send(result.Marca)
    })
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