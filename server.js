var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken');

var port = Number(process.env.PORT || 3333);

mongoose.connect('mongodb://adam:rest@proximus.modulusmongo.net:27017/u8veMipa');
app.use(morgan('dev'));

//configure app to use bodyParser()
//to let us getting data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Request-Headers", "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Credentials", "true");
	// res.header('Access-Control-Origin','*');
	// // res.header('Access-Control-Allow-Origin', 'http://sport-radar-front-end.herokuapp.com');
	// res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
	next();
})

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body['auth'];
  if (!token) return next();

  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register, Log in using, or validate Your email to add games'
      });
    } else {
      req.user = user;
      next();
    }
  });

});

var City = require('./models/city');
var Court = require('./models/court');
var Game = require('./models/game');
var User = require('./models/user');
var routes = require('./routes/api');

//testing our router
var welcomeMsg = {
	message: 'Welcome to amazing SportRadar api!',
	link: 'http://localhost:' + port + '/api/v1'
}
var entriesLinks = {
	links: [{
		games: 'http://localhost:' + port + '/api/v1/games',
		game: 'http://localhost:' + port + '/api/v1/games/:id',
		courts: 'http://localhost:' + port + '/api/v1/courts',
		court: 'http://localhost:' + port + '/api/v1/courts/:id'
		// users: 'http://localhost:' + port + '/api/v1/users',
		// user: 'http://localhost:' + port + '/api/v1/users/:id',
		// cities: 'http://localhost:' + port + '/api/v1/cities',
		// city: 'http://localhost:' + port + '/api/v1/cities/:id'

	}]
}
app.get('/', function(req, res){
	res.json(welcomeMsg);
});
app.get('/api/v1', function(req, res){
	res.json(entriesLinks);
});

//Routes

var base = '/api/v1';

// app.get(base + '/users', routes.users.showall);
// app.post(base + '/users', routes.users.create);
// app.put(base + '/users/:user_id', routes.users.update);
// app.delete(base + '/users/:user_id', routes.users.destroy);
// app.get(base + '/users/:user_id', routes.users.show);

app.get(base + '/games', routes.games.showall);
app.post(base + '/games', routes.games.create);
// app.options(base + '/games', function(req,res,next){});

// app.put(base + '/games/:game_id', routes.games.update);
// app.delete(base + '/games/:game_id', routes.games.destroy);
app.get(base + '/games/:game_id', routes.games.show);

app.get(base + '/courts', routes.courts.showall);
app.post(base + '/courts', routes.courts.create);
// app.put(base + '/courts/:court_id', routes.courts.update);
// app.delete(base + '/courts/:court_id', routes.courts.destroy);
app.get(base + '/courts/:court_id', routes.courts.show);

// app.get(base + '/cities', routes.cities.showall);
// app.post(base + '/cities', routes.cities.create);
// app.put(base + '/cities/:city_id', routes.cities.update);
// app.delete(base + '/cities/:city_id', routes.cities.destroy);
// app.get(base + '/cities/:city_id', routes.cities.show);

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
