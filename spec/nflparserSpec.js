/**
 * Created by Timo on 01.11.2016.
 */

var helper = require('./../modules/nfl-live/helper');
var body = '{"ss":[["Thu","20:25:00","Final",,"JAX","22","TEN","36",,,"57008",,"REG8","2016"],["Sun","13:00:00","Final",,"NE","41","BUF","25",,,"57011",,"REG8","2016"],["Sun","13:00:00","Final",,"ARI","20","CAR","30",,,"57018",,"REG8","2016"],["Sun","13:00:00","Final",,"NYJ","31","CLE","28",,,"57012",,"REG8","2016"],["Sun","13:00:00","Final",,"DET","13","HOU","20",,,"57013",,"REG8","2016"],["Sun","13:00:00","Final",,"KC","30","IND","14",,,"57014",,"REG8","2016"],["Sun","13:00:00","Final",,"SEA","20","NO","25",,,"57015",,"REG8","2016"],["Sun","13:00:00","final overtime",,"OAK","30","TB","24",,,"57016",,"REG8","2016"],["Sun","16:05:00","Final",,"SD","19","DEN","27",,,"57017",,"REG8","2016"],["Sun","16:25:00","Final",,"GB","32","ATL","33",,,"57010",,"REG8","2016"],["Sun","20:30:00","final overtime",,"PHI","23","DAL","29",,,"57019",,"REG8","2016"],["Sun","9:30:00","final overtime",,"WAS","27","CIN","27",,,"57009",,"REG8","2016"],["Mon","20:30:00","Final",,"MIN","10","CHI","20",,,"57020",,"REG8","2016"]]}';
var obj = {
    ss: [
        ['Thu', '20:25:00', 'Final', null, 'JAX', '22', 'TEN', '36', null, null, '57008', null, 'REG8', '2016'],
        ['Sun', '13:00:00', 'Final', null, 'NE', '41', 'BUF', '25', null, null, '57011', null, 'REG8', '2016'],
        ['Sun', '13:00:00', 'Final', null, 'ARI', '20', 'CAR', '30', null, null, '57018', null, 'REG8', '2016'],
        ['Sun', '13:00:00', 'Final', null, 'NYJ', '31', 'CLE', '28', null, null, '57012', null, 'REG8', '2016'],
        ['Sun', '13:00:00', 'Final', null, 'DET', '13', 'HOU', '20', null, null, '57013', null, 'REG8', '2016']
    ]
};
var games = [{
    kickoff: {day: 'Thu', time: '20:25:00'},
    game: {quarter: 'Final', gameClock: null},
    guestTeam: {name: 'JAX', score: '22', posession: false},
    homeTeam: {name: 'TEN', score: '36', posession: false},
    season: {gameday: 'REG8', year: '2016'}
},
    {
        kickoff: {day: 'Sun', time: '13:00:00'},
        game: {quarter: 'Final', gameClock: null},
        guestTeam: {name: 'NE', score: '41', posession: false},
        homeTeam: {name: 'BUF', score: '25', posession: false},
        season: {gameday: 'REG8', year: '2016'}
    },
    {
        kickoff: {day: 'Sun', time: '13:00:00'},
        game: {quarter: 'Final', gameClock: null},
        guestTeam: {name: 'ARI', score: '20', posession: false},
        homeTeam: {name: 'CAR', score: '30', posession: false},
        season: {gameday: 'REG8', year: '2016'}
    },
    {
        kickoff: {day: 'Sun', time: '13:00:00'},
        game: {quarter: 'Final', gameClock: null},
        guestTeam: {name: 'NYJ', score: '31', posession: false},
        homeTeam: {name: 'CLE', score: '28', posession: false},
        season: {gameday: 'REG8', year: '2016'}
    },
    {
        kickoff: {day: 'Sun', time: '13:00:00'},
        game: {quarter: 'Final', gameClock: null},
        guestTeam: {name: 'DET', score: '13', posession: false},
        homeTeam: {name: 'HOU', score: '20', posession: false},
        season: {gameday: 'REG8', year: '2016'}
    }];

describe('NFL Parser', function () {
    describe('Helper', function () {
        describe('CreateObjectFromJson()', function () {
            it('should return an object', function () {
                var obj = helper.createObjectFromJson(body);
                expect(typeof obj).toBe('object');
            });
            it('returned object should have a ss property', function () {
                var obj = helper.createObjectFromJson(body);
                expect(obj.ss).toBeDefined();
            });
            it('ss property should be an array', function () {
                var obj = helper.createObjectFromJson(body);
                expect(typeof obj.ss).toBe('object');
                expect(obj.ss.constructor).toBe(Array);
            });
            it('ss property should have a length of 13', function () {
                var obj = helper.createObjectFromJson(body);
                expect(obj.ss.length).toEqual(13);
            });
            it('ss property should contain only arrays', function () {
                var obj = helper.createObjectFromJson(body);
                for (var i in obj.ss) {
                    expect(typeof obj.ss[i]).toBe('object');
                    expect(obj.ss[i].constructor).toBe(Array);
                }
            });
            it('ss property should only contain arrays of length 14', function () {
                var obj = helper.createObjectFromJson(body);
                for (var i in obj.ss) {
                    expect(obj.ss[i].length).toBe(14);
                }
            })
        });
        describe('createGameObject()', function () {
            it('should return an object', function () {
                var game = ["Thu", "20:25:00", "Final", null, "JAX", "22", "TEN", "36", null, null, "57008", null, "REG8", "2016"];
                var obj = helper.generateGameObject(game);
                expect(typeof obj).toBe('object');
            });
            it('should return an object with all required properties', function () {
                var game = ["Thu", "20:25:00", "Final", null, "JAX", "22", "TEN", "36", null, null, "57008", null, "REG8", "2016"];
                var obj = helper.generateGameObject(game);
                expect(obj.kickoff).toBeDefined();
                expect(obj.game).toBeDefined();
                expect(obj.guestTeam).toBeDefined();
                expect(obj.homeTeam).toBeDefined();
                expect(obj.season).toBeDefined();
            });
            describe('kickoff property', function () {
                it('should have all required properties', function () {
                    var game = ["Thu", "20:25:00", "Final", null, "JAX", "22", "TEN", "36", null, null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.kickoff.day).toBeDefined();
                    expect(obj.kickoff.time).toBeDefined();
                });
                it('should have valid properties', function () {
                    var game = ["Thu", "20:25:00", "1", "9:46", "JAX", "22", "TEN", "36", "JAX", null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.kickoff.day).toBe('Thu');
                    expect(obj.kickoff.time).toBe('20:25:00');
                })
            });
            describe('game property', function () {
                it('should have all required properties', function () {
                    var game = ["Thu", "20:25:00", "Final", null, "JAX", "22", "TEN", "36", null, null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.game.quarter).toBeDefined();
                    expect(obj.game.gameClock).toBeDefined();
                });
                it('should have valid properties', function () {
                    var game = ["Thu", "20:25:00", "1", "9:46", "JAX", "22", "TEN", "36", "JAX", null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.game.quarter).toBe('1');
                    expect(obj.game.gameClock).toBe('9:46');
                });
            });
            describe('guestTeam property', function () {
                it('should have all required properties', function () {
                    var game = ["Thu", "20:25:00", "Final", null, "JAX", "22", "TEN", "36", null, null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.guestTeam.name).toBeDefined();
                    expect(obj.guestTeam.score).toBeDefined();
                    expect(obj.guestTeam.posession).toBeDefined();
                });
                it('should have valid properties', function () {
                    var game = ["Thu", "20:25:00", "1", "9:46", "JAX", "22", "TEN", "36", "JAX", null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.guestTeam.name).toBe('JAX');
                    expect(obj.guestTeam.score).toBe('22');
                    expect(obj.guestTeam.posession).toEqual(true);
                });
            });
            describe('homeTeam property', function () {
                it('should have all required properties', function () {
                    var game = ["Thu", "20:25:00", "Final", null, "JAX", "22", "TEN", "36", null, null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.homeTeam.name).toBeDefined();
                    expect(obj.homeTeam.score).toBeDefined();
                    expect(obj.homeTeam.posession).toBeDefined();
                });
                it('should have valid properties', function () {
                    var game = ["Thu", "20:25:00", "1", "9:46", "JAX", "22", "TEN", "36", "JAX", null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.homeTeam.name).toBe('TEN');
                    expect(obj.homeTeam.score).toBe('36');
                    expect(obj.homeTeam.posession).toEqual(false);
                });
            });
            describe('season property', function () {
                it('should have all required properties', function () {
                    var game = ["Thu", "20:25:00", "Final", null, "JAX", "22", "TEN", "36", null, null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.season.gameday).toBeDefined();
                    expect(obj.season.year).toBeDefined();
                });
                it('should have valid properties', function () {
                    var game = ["Thu", "20:25:00", "1", "9:46", "JAX", "22", "TEN", "36", "JAX", null, "57008", null, "REG8", "2016"];
                    var obj = helper.generateGameObject(game);
                    expect(obj.season.gameday).toBe('REG8');
                    expect(obj.season.year).toBe('2016');
                });
            });
        });
        describe('createGamesArray()', function () {
            it('should return an array', function () {
                var games = helper.createGamesArray(obj);
                expect(typeof games).toBe('object');
                expect(games.constructor).toBe(Array);
            });
            it('should contain objects', function () {
                var games = helper.createGamesArray(obj);
                for (var i in games) {
                    expect(typeof games[i]).toBe('object');
                }
            });
        });
        describe('generateStandingsObject()', function () {
            var standings;
            beforeEach(function () {
                standings = helper.generateStandingsObject(games);
            });
            it('should return an object', function () {
                expect(standings).toEqual(jasmine.any(Object));
            });
            it('should have a standings property', function () {
                expect(standings.standings).toBeDefined();
            });
            it('should have a standings property which is equal to the given one', function () {
                expect(standings.standings).toEqual(games);
            })
        });
        describe('filerLiveGames()', function () {
            var liveGames;
            beforeEach(function () {
                liveGames = helper.filterLiveGames(games);
            });
            it('should return an array', function () {
                expect(liveGames).toEqual(jasmine.any(Object));
                expect(liveGames.constructor).toEqual(Array);
            });
            it('should return an empty array', function () {
                expect(liveGames.length).toBe(0);
            })
        })
    });
});
