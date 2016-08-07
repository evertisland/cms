'use strict';

const express = require('express');
//const database = require('./database');
const MongoClient = require('mongodb').MongoClient;
const PORT = 8080;
const URL = 'mongodb://0.0.0.0:27017/articles';
const app = express();
app.set('views', __dirname);
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
          title = content[0].title;
          body = content[0].body;
          date = content[0].date;
          res.render('index', {title: title, body: body, date: date});
        });
      });
    }
  });
});

app.listen(PORT);
console.log('Listening on PORT: ', PORT);
