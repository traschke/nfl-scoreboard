/**
 * Created by Timo on 10.10.2016.
 */

var express = require('express');
var winston = require('winston');
var logger = require('./modules/logger');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var config = require('./config.json');

var nflRouter = require('./routes/nfl');

var app = express();

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());

// Public dir for serving html and stuff
app.use(express.static(path.join(__dirname, 'public/dist')));

// If a badge is not found, serve a generic badge
app.use('/images/badges', function (req, res, next) {
    res.statusCode = 404;
    res.sendFile(path.join(__dirname, 'public/dist/images/badges/404.svg'));
});

// API Endpoints
app.use('/api/standings', nflRouter);

app.all('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'public/dist/index.html'));
});

// Start the app
app.listen(config.port, function (err) {
    if (err !== undefined) {
        winston.error('Error on startup, ', err)
    } else {
        winston.info('Listening on port %d', config.port)
    }
});