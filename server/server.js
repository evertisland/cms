(function() {
    'use strict';

    const express = require('express');
    const bodyParser = require('body-parser');
    const mongo = require('mongodb');
    const MongoClient = mongo.MongoClient;
    const MongoDB = mongo.Db;
    const Server = mongo.Server;
    const PORT = 8081;
    const URL = 'mongodb://localhost:27017';
    const app = express();
    var database;

    (function initialize() {
        configureExpress();
        defineRoutes();
        assignPort();
        initWebpack();
    }());

    function configureExpress() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.static('client/output'));
        app.set('views', 'client/output/');
        app.set('view engine', 'pug');
    }

    function createDatabase() {
        database = new MongoDB('articles', new Server('localhost', 27017));
        database.open(function (err,db) {
            if (err) {
                console.log(err);
            } else {
                console.log('successful');
            }
        })
    }

    function defineRoutes() {
        // INDEX
        app.get('/', function(req, res) {
            var title, content, author, date;
            MongoClient.connect(URL, function(err, db) {
                if (err) {
                    console.log('Unable to connect to Mongo');
                    process.exit(1);
                    createDatabase();
                    defineRoutes();
                } else {
                    console.log('Connection to Mongo successful');
                    var articles = db.collection('articles');
                    articles.find({}, function(err, data) {
                        data.toArray(function(err, body) {
                            if (body.length) {
                                body = body[body.length - 1];
                                title = body.title;
                                content = body.content;
                                author = body.author;
                                date = body.date;
                            } else {
                                title = 'New Blog';
                                content = 'Please insert content!';
                                author = 'Place Holder';
                                date = new Date(Date.now());
                            }

                            res.render('index', {
                                title: title,
                                content: content,
                                author: author,
                                date: date
                            });
                        });
                    });
                }
            });
        });
        // ARTICLES
        app.get('/articles', function(req, res) {
            console.log(req.body);
            res.render('articles', {});
        });
        // ARTICLE
        app.get('/article/:id', function(req, res) {
            var article = req.params.id;
            res.render('article', {});
        });
        // ADD ARTILCE
        app.post('/add-article', function(req, res) {
            var title = req.body.title;
            var content = req.body.content;
            var author = req.body.author;
            MongoClient.connect(URL, function(err, db) {
                if (err) {
                    console.log('Unable to connect to Mongo');
                    process.exit(1);
                } else {
                    console.log('Connection to Mongo successful');
                    var articles = db.collection('articles');
                    articles.insert({
                        "title": title,
                        "content": content,
                        "author": author,
                        "date": new Date(Date.now())
                    }, callback(err));
                    function callback() {
                        if (err) {
                            res.send('Problem with inserting to database')
                        } else {
                            res.send('Insert was successfule')
                        }
                    }
                }
            });
        });
        // API
        app.get('/api', function(req, res) {
            res.send('Welcome to API');
        });
    }

    function initWebpack() {
        if (app.get('env') === 'development') {
            var middleware = require('webpack-dev-middleware');
            var webpack = require('webpack');
            var config = require('./webpack.config');
            app.use(middleware(webpack(config), {
                publicPath: '/client/output/client',
                headers: {'X-Custom-Webpack-Header': 'yes'},
                stats: { colors: true}
            }));
        }
    }

    function assignPort() {
        app.listen(PORT);
        console.log('Listening on PORT: ', PORT);
    }
}());
