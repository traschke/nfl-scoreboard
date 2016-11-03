/**
 * Created by Timo on 01.11.2016.
 */

var logger = require('winston');
var helper = require('./helper');

var parseAllGames = function (json) {
    var obj = helper.createObjectFromJson(json);
    var games = helper.createGamesArray(obj);
    var standingsObject = helper.generateStandingsObject(games);
    return standingsObject;
};

var parseLiveGames = function (json) {
    var obj = helper.createObjectFromJson(json);
    var games = helper.createGamesArray(obj);
    var standingsObject = helper.generateStandingsObject(helper.filterLiveGames(games));
    return standingsObject;
};


var bla = {
    parseAllGames: parseAllGames,
    parseLiveGames: parseLiveGames
};

module.exports = bla;