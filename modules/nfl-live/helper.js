/**
 * Created by Timo on 01.11.2016.
 */

var logger = require('winston');

/**
 *
 * @param obj
 * @returns {Array}
 */
var createGamesArray = function (obj) {
    var games = [];
    for (var i in obj.ss) {
        var game = generateGameObject(obj.ss[i]);
        games.push(game);
    }
    return games;
};

/**
 *
 * @param games
 * @returns {Array}
 */
var filterLiveGames = function (games) {
    var liveGames = [];
    for (var i = 0; i < games.length; i++) {
        if (games[i].game.quarter != 'Final' &&
            games[i].game.quarter != 'final overtime' &&
            games[i].game.quarter != 'Pregame') {
            liveGames.push(games[i]);
        }
    }
    return liveGames;
};

/**
 *
 * @param json
 * @returns {any}
 */
var createObjectFromJson = function (json) {
    json = json.replace(/,,/g, ',null,');
    json = json.replace(/,,/g, ',null,');
    json = json.replace(/,,/g, ',null,');
    var obj = JSON.parse(json);
    return obj;
};

/**
 *
 * @param games
 * @returns {{standings: []}}
 */
var generateStandingsObject = function (games) {
    return {standings: games};
};

/**
 *
 * @param res
 * @returns {{kickoff: {day: *, time: *}, game: {quarter: *, gameClock: *}, guestTeam: {name: *, score: *, posession: boolean}, homeTeam: {name: *, score: *, posession: boolean}, season: {gameday: *, year: *}}}
 */
var generateGameObject = function (res) {
    var game = {
        kickoff: {
            day: res[0],
            time: res[1]
        },
        game: {
            quarter: res[2],
            gameClock: res[3]
        },
        guestTeam: {
            name: res[4],
            score: res[5],
            posession: res[8] == res[4]
        },
        homeTeam: {
            name: res[6],
            score: res[7],
            posession: res[8] == res[6]
        },
        season: {
            gameday: res[12],
            year: res[13]
        }
    };
    return game;
};

var helper = {
    createGamesArray: createGamesArray,
    filterLiveGames: filterLiveGames,
    createObjectFromJson: createObjectFromJson,
    generateStandingsObject: generateStandingsObject,
    generateGameObject: generateGameObject
};

module.exports = helper;