// Load Node modules
var express = require('express');
var mysql = require('mysql');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Port website will run on
app.listen(8080);