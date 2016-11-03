/**
 * Created by Timo on 26.10.2016.
 */

var teams = [
    'DEN', 'HOU', 'CHI', 'GB',
    'NYG', 'LA', 'CLE', 'CIN',
    'WAS', 'DET', 'OAK', 'JAX',
    'NO', 'KC', 'BUF', 'MIA',
    'BAL', 'NYJ', 'MIN', 'PHI',
    'IND', 'TEN', 'SD', 'ATL',
    'TB', 'SF', 'NE', 'PIT',
    'SEA', 'ARI', 'CAR', 'DAL'
];

var days = ['Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ["Thu","20:25:00","Final",,"JAX","22","TEN","36",,,"57008",,"REG8","2016"]
function generateJsonGame(day, time, quarter, clock, guestTeam, guestPoints, homeTeam, homePoints, posessionTeam, id, matchday, year) {
    var strip = '["{0}","{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}",,"{9}",,"{10}","{11}"]';
    var generatedStrip = strip.format(day, time, quarter, clock, guestTeam, guestPoints, homeTeam, homePoints, posessionTeam, id, matchday, year);
    return generatedStrip;
}

function createResponse(gamesString) {
    var template = '{"ss":[{0}]}';
    var generatedReponse = template.format(gamesString);
    return generatedReponse;
}

var generateRandomGame = function () {
    var day = days[random(0, 6)];
    var time = '{0}:{1}:{2}'.format(random(10, 23), random(10, 59), random(10, 59));
    var quarter = random(1, 5);
    var clock = '{0}:{1}'.format(random(0, 14), random(10, 59));
    var guestTeam = teams[Math.floor(Math.random() * teams.length)];
    var guestPoints = random(0, 60);
    var homeTeam = teams[Math.floor(Math.random() * teams.length)];
    var homePoints = random(0, 60);
    var posessionTeam = [true, false][Math.round(Math.random())] ? guestTeam : homeTeam;
    var id = random(10000, 99999);
    var matchday = 'REG{0}'.format(random(1, 12));
    var year = random(2000, 2050);

    var game = generateJsonGame(day, time, quarter, clock, guestTeam, guestPoints, homeTeam, homePoints, posessionTeam, id, matchday, year);

    return game;
};

var generateRandomStandings = function (length) {
    var games = [];
    for (var i = 0; i < length; i++) {
        games.push(generateRandomGame());
    }
    var response = createResponse(games.join());

    return response;
};

var randomNfl = {
    generateRandomStandings: generateRandomStandings
};

module.exports = randomNfl;