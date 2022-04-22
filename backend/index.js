//Declares the necessary imports
import app from "./server.js"
import mongodb from 'mongodb'
import dotenv from "dotenv"
import productsDAO from "./dao/productsDAO.js"

dotenv.config();

//Declares the variables of the database connection info
const MongoClient=mongodb.MongoClient;

const port =process.env.PORT || 5000;

//Establishes the connection with the Mongodb database
MongoClient.connect(
    process.env.BARCELPARTS_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser:true
    }
)
// If there is an error catches in and displays in console
.catch(err =>{
    console.error(err.stack);
    process.exit(1);
})
.then(async client =>{
    await productsDAO.injectDB(client)
    //Opens the listening port for commands
    app.listen(port,() => {
        console.log('listening on port ' + port);
    })
})