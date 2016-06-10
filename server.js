var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://adam:rest@proximus.modulusmongo.net:27017/u8veMipa');
app.use(morgan('dev'));

//configure app to use bodyParser()
//to let us getting data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req,res,next){
	res.header('Access-Control-Origin','*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	next();
})

var City = require('./models/city');
var Court = require('./models/court');
var Game = require('./models/game');
var User = require('./models/user');
var routes = require('./routes/api');


//testing our router
app.get('/', function(req, res){
	res.json({ message: 'Welcome to amazing SportRadar api! type /api/v1 and check what is waiting for You'});
});
app.get('/api/v1', function(req, res){
	res.json({ message: 'You can query by City Court Game or User'});
});


//Routes

var base = '/api/v1';

app.get(base + '/users', routes.users.showall);
app.post(base + '/users', routes.users.create);
app.put(base + '/users/:user_id', routes.users.update);
app.delete(base + '/users/:user_id', routes.users.destroy);
app.get(base + '/users/:user_id', routes.users.show);

// app.get(base + '/teams', routes.teams.showall);
// app.post(base + '/teams', routes.teams.create);
// app.put(base + '/teams/:team_id', routes.teams.update);
// app.delete(base + '/teams/:team_id', routes.teams.destroy);
// app.get(base + '/teams/:team_id', routes.teams.show);

app.get(base + '/games', routes.games.showall);
app.post(base + '/games', routes.games.create);
app.put(base + '/games/:game_id', routes.games.update);
app.delete(base + '/games/:game_id', routes.games.destroy);
app.get(base + '/games/:game_id', routes.games.show);

app.get(base + '/courts', routes.courts.showall);
app.post(base + '/courts', routes.courts.create);
app.put(base + '/courts/:court_id', routes.courts.update);
app.delete(base + '/courts/:court_id', routes.courts.destroy);
app.get(base + '/courts/:court_id', routes.courts.show);

app.get(base + '/cities', routes.cities.showall);
app.post(base + '/cities', routes.cities.create);
app.put(base + '/cities/:city_id', routes.cities.update);
app.delete(base + '/cities/:city_id', routes.cities.destroy);
app.get(base + '/cities/:city_id', routes.cities.show);

// app.get(base + '/conferences', routes.conferences.showall);
// //app.post(base + '/conferences', routes.conferences.create);
// app.put(base + '/conferences/:conference_id', routes.conferences.update);
// //app.delete(base + '/conferences/:conference_id', routes.conferences.destroy);
// app.get(base + '/conferences/:conference_id', routes.conferences.show);

app.use(function(req, res) {
     res.status(404).send('404: Page not Found');
  });
app.use(function(req, res) {
     res.status(500).send('Internal server problem');
  });
//Let's start our server
var port = Number(process.env.PORT || 3333);
app.listen(port);
console.log(port + ' where amazing happens');
console.log(' check htttp://localhost:' + port + '/api/v1');
