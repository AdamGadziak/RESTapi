var mongoose = require('mongoose'),
    Game = mongoose.model('Game');
//GET ALL GAMES
exports.showall = function(req, res, next) {
  var query = {},
    sort = 1;
  if (req.query.court) {
    query.court = req.query.court;
  }
  if (req.query.sort) {
    sort = req.query.sort;
  }

  Game.find(query).populate('city court').sort({date: sort}).exec(function(err, games) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err){
                console.log(err);
        return res.status(404).send({ errors: ['Games not found'] });
      }
      res.json(games); // return all pandas in JSON format
    });
};
//GET GAME BY ID
exports.show = function(req, res) {
    Game.findById(req.params.game_id).populate('city court').exec(function(err, game) {
            if (err){
                console.log(err);
                return res.status(404).send({ errors: ['Couldn\' find game with this id'] });
            }
            if (!game) { return res.status(404).send({ errors: ['no such game'] })};
            res.json(game);
      });
};
//POST GAME
exports.create = function(req, res) {
  if (!req.user || !req.user.isEmailVerified) {
    return res.status(401).json({
      message: 'Permission Denied! Please verify Your email'
    });
  }
  var game = new Game(req.body);

    game.save(function(err) {
      if (err){
                console.log(err);
        return res.status(422).send({ errpr: ['Invalid data input!!!']});
      }
      res.status(201).send({ message: 'Game Added' });
    });
};

//PUT GAME
exports.update = function(req, res, next) {
   Game.findById(req.params.game_id, function(err, game) {
                        if (err) {
                                console.log(err);
                                return res.status(404).send({ errors: ['Game not found'] });
                        }
                        if (!game) { return res.status(404).send({ errors: ['no such game'] })};
                        for (prop in req.body) {
                  game[prop] = req.body[prop];
              }
                        game.save(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Validation error'] });; }
                                res.status(200).json({ message: 'Game updated!' });
                        });

                });
};
//REMOVE GAME
exports.destroy = function(req, res, next) {
Game.findById(req.params.game_id, function(err, game) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Game not found'] });; }
                        if (!game) { return res.status(404).send({ errors: ['no such game'] })};
                        game.remove(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Sth bad happen'] });; }
                                res.status(200).json({ message: 'Game removed!' });
                        });

                });
};