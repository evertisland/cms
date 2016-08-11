const express = require('express');
const app = express();

app.get('/api', function (req,res) {
    res.send('Welcome to the API');
});

module.exports = app;
