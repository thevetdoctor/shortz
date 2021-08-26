const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routes/index');
const path = require('path');

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../ui')))
app.use(router);

app.get('/', (req, res) => {
    console.log('Welcome to URL shortener...');
    res.sendFile(path.join(__dirname, '../ui/', 'index.html'));
});

module.exports = app;