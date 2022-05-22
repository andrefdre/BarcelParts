//Declares the necessary imports
const app = require("./server.js")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

const db = mongoose.connection;

const port = process.env.PORT || 5000;

//Establishes the connection with the Mongodb database
mongoose.connect(
    process.env.BARCELPARTS_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

//Listens on the port to retrieve information from frontend 
app.listen(port,() => {
    console.log('listening on port ' + port);
})