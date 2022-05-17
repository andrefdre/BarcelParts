//Declares the necessary imports
const express = require("express");
const cors = require("cors");
const routes = require("./api/routes.js");

//Creates the express
const app = express();



app.use(cors());
app.use(express.json());

app.use("/api/routes" , routes);
app.use("*", (req,res)=> res.status(404).json({error:"not found"}));

module.exports = app