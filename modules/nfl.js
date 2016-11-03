/**
 * Created by Timo on 23.10.2016.
 */

var request = require('request');
var logger = require('winston');

var randomNfl = require('./randomNfl');
var parser = require('./nfl-live/nfl-live-standings-parser');

var config = require('./../config.json');
const options = {
    url: 'http://www.nfl.com/liveupdate/scorestrip/scorestrip.json',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'
    }
};

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var getAllGames = function () {
    return new Promise(function (resolve, reject) {
        getDataFromNfl().then(
            function (body) {
                var standings = parser.parseAllGames(body);
                resolve(standings);
            },
            function (err) {
                reject(err);
            }
        )
    });
};

var getLiveGames = function () {
    return new Promise(function (resolve, reject) {
        getDataFromNfl().then(
            function (body) {
                var standings = parser.parseLiveGames(body);
                resolve(standings);
            },
            function (err) {
                reject(err);
            }
        )
    });
};

var getTestGames = function () {
    return new Promise(function (resolve, reject) {
        var body = randomNfl.generateRandomStandings(12);
        var standings = parser.parseLiveGames(body);
        resolve(standings);
    });
};

var getDataFromNfl = function () {
    return new Promise(function (resolve, reject) {
        request.get(options, function (err, res, body) {
            if (err) {
                return reject(err);
            }
            if (res.statusCode == 200) {
                return resolve(body);
            }
            return reject(new Error('Did not receive status code 200 from NFL.com, instead received ' + res.statusCode + '.'));
        });
    });
};

var nfl = {
    getAllGames: getAllGames,
    getLiveGames: getLiveGames,
    getTestGames: getTestGames
};

module.exports = nfl;