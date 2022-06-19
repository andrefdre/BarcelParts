//Declares the necessary imports
const express = require("express");
const cors = require("cors");
const routes = require("./api/routes.js");
const bodyParser = require('body-parser')


//Creates the express
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/routes" , routes);
app.use("*", (req,res)=> res.status(404).json({error:"not found"}));

module.exports = app