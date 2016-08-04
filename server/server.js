'use strict';

const express = require('express');
const mongo = require('mongodb').MongoClient;
const PORT = 8080;
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
mongo.connect('mongodb://localhost:27017/test', function (err,db) {
  if (err) {
    throw err;
  }
  console.log(db);
});
