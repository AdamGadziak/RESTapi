var mongoose = require('mongoose'),
    Player = mongoose.model('Player');
//GET ALL PLAYERS
exports.showall = function(req, res, next) {
	Player.find(function(err, players) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err){
                console.log(err);
				return res.status(404).send({ errors: ['Players not found'] });
			}
			res.json(players); // return all pandas in JSON format
		});
};
//GET PLAYER BY ID
exports.show = function(req, res) {
    Player.findById(req.params.player_id).populate('team').exec(function(err, player) {
            if (err){
                console.log(err);
                return res.status(404).send({ errors: ['Couldn\' find player with this id'] });
            }
            if (!player) { return res.status(404).send({ errors: ['no such player'] })};
            res.json(player);
    	});
};
//POST PLAYER
exports.create = function(req, res) {
	var player = new Player(req.body);

    player.save(function(err) {
			if (err){
                console.log(err);
				return res.status(422).send({ errpr: ['Invalid data input!!!']});
			}
			res.status(201).send({ message: 'Player Added' });
		});
};

//PUT PLAYER
exports.update = function(req, res, next) {
	 Player.findById(req.params.player_id, function(err, player) {
                        if (err) {
                                console.log(err);
                                return res.status(404).send({ errors: ['Player not found'] });
                        }
                        if (!player) { return res.status(404).send({ errors: ['no such player'] })};
                        for (prop in req.body) {
      						player[prop] = req.body[prop];
    					}
                        player.save(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Validation error'] });; }
                                res.status(200).json({ message: 'Player updated!' });
                        });

                });
};
//REMOVE PLAYER
exports.destroy = function(req, res, next) {
Player.findById(req.params.player_id, function(err, player) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Player not found'] });; }
                        if (!player) { return res.status(404).send({ errors: ['no such player'] })};
                        player.remove(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Sth bad happen'] });; }
                                res.status(200).json({ message: 'Player removed!' });
                        });

                });
};