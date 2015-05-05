var express = require('express');
var app = express();
var morgan = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://adam:rest@proximus.modulusmongo.net:27017/u8veMipa');
app.use(morgan('dev'));

var bodyParser = require('body-parser');
//configure app to use bodyParser()
//to let us getting data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var Conference = require('./models/conference');
var Court = require('./models/court');
var Game = require('./models/game');
var Player = require('./models/player');
var Team = require('./models/team');
var routes = require('./routes/api');


//testing our router
app.get('/', function(req, res){
	res.json({ message: 'Welcome to amazing BasketballGames api'});
});
app.get('/api/v1', function(req, res){
	res.json({ message: 'We have conferences, courts, games, players and teams'});
});


//Routes

var base = '/api/v1';

app.get(base + '/players', routes.players.showall);
app.post(base + '/players', routes.players.create);
app.put(base + '/players/:player_id', routes.players.update);
app.delete(base + '/players/:player_id', routes.players.destroy);
app.get(base + '/players/:player_id', routes.players.show);

app.get(base + '/teams', routes.teams.showall);
app.post(base + '/teams', routes.teams.create);
app.put(base + '/teams/:team_id', routes.teams.update);
app.delete(base + '/teams/:team_id', routes.teams.destroy);
app.get(base + '/teams/:team_id', routes.teams.show);

app.get(base + '/games', routes.games.showall);
app.post(base + '/games', routes.games.create);
//app.put(base + '/games/:game_id', routes.games.update);
//app.delete(base + '/games/:game_id', routes.games.destroy);
app.get(base + '/games/:game_id', routes.games.show);

app.get(base + '/courts', routes.courts.showall);
//app.post(base + '/courts', routes.courts.create);
//app.put(base + '/courts/:court_id', routes.courts.update);
//app.delete(base + '/courts/:court_id', routes.courts.destroy);
app.get(base + '/courts/:court_id', routes.courts.show);

app.get(base + '/conferences', routes.conferences.showall);
//app.post(base + '/conferences', routes.conferences.create);
app.put(base + '/conferences/:conference_id', routes.conferences.update);
//app.delete(base + '/conferences/:conference_id', routes.conferences.destroy);
app.get(base + '/conferences/:conference_id', routes.conferences.show);

app.use(function(req, res) {
     res.status(404).send('404: Page not Found');
  });
app.use(function(req, res) {
     res.status(500).send('Internal server problem');
  });
//Let's start our server
app.listen(port);
console.log(port + ' where amazing happens');
console.log(' check htttp://localhost:' + port + '/api/v1');
