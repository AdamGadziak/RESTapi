var mongoose = require('mongoose'),
    User = mongoose.model('User');
//GET ALL PLAYERS
exports.showall = function(req, res, next) {
	User.find(function(err, users) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err){
                console.log(err);
				return res.status(404).send({ errors: ['Users not found'] });
			}
			res.json(users); // return all pandas in JSON format
		});
};
//GET PLAYER BY ID
exports.show = function(req, res) {
    User.findById(req.params.user_id).populate('team').exec(function(err, user) {
            if (err){
                console.log(err);
                return res.status(404).send({ errors: ['Couldn\' find user with this id'] });
            }
            if (!user) { return res.status(404).send({ errors: ['no such user'] })};
            res.json(user);
    	});
};
//POST PLAYER
exports.create = function(req, res) {
	var user = new User(req.body);

    user.save(function(err) {
			if (err){
                console.log(err);
				return res.status(422).send({ errpr: ['Invalid data input!!!']});
			}
			res.status(201).send({ message: 'User Added' });
		});
};

//PUT PLAYER
exports.update = function(req, res, next) {
	 User.findById(req.params.user_id, function(err, user) {
                        if (err) {
                                console.log(err);
                                return res.status(404).send({ errors: ['User not found'] });
                        }
                        if (!user) { return res.status(404).send({ errors: ['no such user'] })};
                        for (prop in req.body) {
      						user[prop] = req.body[prop];
    					}
                        user.save(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Validation error'] });; }
                                res.status(200).json({ message: 'User updated!' });
                        });

                });
};
//REMOVE PLAYER
exports.destroy = function(req, res, next) {
User.findById(req.params.user_id, function(err, user) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['User not found'] });; }
                        if (!user) { return res.status(404).send({ errors: ['no such user'] })};
                        user.remove(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Sth bad happen'] });; }
                                res.status(200).json({ message: 'User removed!' });
                        });

                });
};