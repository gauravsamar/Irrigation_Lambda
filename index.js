const express = require('express');
const router = express.Router();
const drivers = require('./drivers');
const bodyParser = require('body-parser');
const Persons = require('./routes/Persons');
const app = express();
app.use(express.json({ extended: false }));

const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Technology1"
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/", (req, res) => {
    res.send("Root API Works");
});

app.use('/',[Persons]);

app.listen(3000, () => {
    console.log("server running on 3000");
});

module.exports = app;
