var mongoose = require('mongoose'),
    Team = mongoose.model('Team');
//GET ALL TEAMS
exports.showall = function(req, res, next) {
  Team.find(function(err, teams) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err){
                console.log(err);
        return res.status(404).send({ errors: ['Teams not found'] });
      }
      res.json(teams); // return all pandas in JSON format
    });
};
//GET TEAM BY ID
exports.show = function(req, res) {
    Team.findById(req.params.team_id).populate('conference').exec(function(err, team) {
            if (err){
                console.log(err);
                return res.status(404).send({ errors: ['Couldn\' find team with this id'] });
            }
            if (!team) { return res.status(404).send({ errors: ['no such team'] })};
            res.json(team);
      });
};
//POST TEAM
exports.create = function(req, res) {
  var team = new Team(req.body);

    team.save(function(err) {
      if (err){
                console.log(err);
        //return res.status(422).send({ errpr: ['Invalid data input!!!']});
        return res.status(422).send(err);
      }
      res.status(201).send({ message: 'Team Added' });
    });
};

//PUT TEAM
exports.update = function(req, res, next) {
   Team.findById(req.params.team_id, function(err, team) {
                        if (err) {
                                console.log(err);
                                return res.status(404).send({ errors: ['Team not found'] });
                        }
                        if (!team) { return res.status(404).send({ errors: ['no such team'] })};
                        for (prop in req.body) {
                          team[prop] = req.body[prop];
                        }
                        team.save(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Validation error'] });; }
                                res.status(200).json({ message: 'Team updated!' });
                        });

                });
};
//REMOVE TEAM
exports.destroy = function(req, res, next) {
Team.findById(req.params.team_id, function(err, team) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Team not found'] });; }
                        if (!team) { return res.status(404).send({ errors: ['no such team'] })};
                        team.remove(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Sth bad happen'] });; }
                                res.status(200).json({ message: 'Team removed!' });
                        });

                });
};










exports.showall2 = function(req, res, next) {
  Team.find(function(err, teams) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err){
        res.status(404).send({ errors: ['teams not found'] });
      }
      res.json(teams); // return all pandas in JSON format
    });
};

exports.create2 = function(req, res) {
    var team = new Team(req.body);

    team.save(function(err) {
        if (err) {
          res.send(err);
        } else {
            res.json(team);
        }
    });
};
