'use strict';

const express = require('express');
//const database = require('./database');
const MongoClient = require('mongodb').MongoClient;
const apiRoute = require('./routes/api');
const PORT = 8080;
const URL = 'mongodb://localhost:27017';
const app = express();
app.use(express.static('client/output'));
app.set('views', 'client/output/');
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  var title, body, date;
  MongoClient.connect(URL, function (err, db) {
    if (err) {
      console.log('Unable to connect to Mongo');
      process.exit(1);
    } else {
      console.log('Connection to Mongo successful');
      var articles = db.collection('articles');
      articles.find({}, function (err, data) {
        data.toArray(function (err, content) {
          title = 'Titles';
          body = 'Text';
          date = new Date(Date.now());
          res.render('index', {title: title, body: body, date: date});
        });
      });
    }
  });
});
app.get('/articles', function (req,res) {
    res.render('articles', {});
});
app.get('/article/:id', function (req,res) {
    var article = req.params.id;
    res.render('article', {});
});
app.get('/api', function (req,res) {
    res.send('Welcome to API');
});

app.listen(PORT);
console.log('Listening on PORT: ', PORT);
