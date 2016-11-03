/**
 * Created by Timo on 23.10.2016.
 */
var express = require('express');
var logger = require('winston');
var nfl = require('./../modules/nfl');

var nflRouter = express.Router();

nflRouter.route('/')
    .get(function (req, res, next) {
        nfl.getAllGames().then(
            function (standings) {
                res.json(standings);
            },
            function (err) {
                next(err);
            }
        );
    });

nflRouter.route('/live')
    .get(function (req, res, next) {
        nfl.getLiveGames().then(
            function (standings) {
                res.json(standings);
            },
            function (err) {
                next(err);
            }
        );
    });

nflRouter.route('/test')
    .get(function (req, res, next) {
        nfl.getTestGames().then(
            function (standings) {
                res.json(standings);
            }
        )
    });

nflRouter.use(function (err, req, res, next) {
    res.statusCode = 503;
    res.json({error: err.message});
});


module.exports = nflRouter;