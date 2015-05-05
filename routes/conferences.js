var mongoose = require('mongoose'),
    Conference = mongoose.model('Conference');
//GET ALL CONFERENCES
exports.showall = function(req, res, next) {
  Conference.find(function(err, conferences) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err){
                console.log(err);
        return res.status(404).send({ errors: ['Conferences not found'] });
      }
      res.json(conferences); // return all pandas in JSON format
    });
};
//GET CONFERENCE BY ID
exports.show = function(req, res) {
    Conference.findById(req.params.conference_id).populate('team').exec(function(err, conference) {
            if (err){
                console.log(err);
                return res.status(404).send({ errors: ['Couldn\' find conference with this id'] });
            }
            if (!conference) { return res.status(404).send({ errors: ['no such conference'] })};
            res.json(conference);
      });
};
//POST CONFERENCE
exports.create = function(req, res) {
  var conference = new Conference(req.body);

    conference.save(function(err) {
      if (err){
                console.log(err);
        return res.status(422).send({ errpr: ['Invalid data input!!!']});
      }
      res.status(201).send({ message: 'Conference Added' });
    });
};

//PUT CONFERENCE
exports.update = function(req, res, next) {
   Conference.findById(req.params.conference_id, function(err, conference) {
                        if (err) {
                                console.log(err);
                                return res.status(404).send({ errors: ['Conference not found'] });
                        }
                        if (!conference) { return res.status(404).send({ errors: ['no such conference'] })};
                        for (prop in req.body) {
                  conference[prop] = req.body[prop];
              }
                        conference.save(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Validation error'] });; }
                                res.status(200).json({ message: 'Conference updated!' });
                        });

                });
};
//REMOVE CONFERENCE
exports.destroy = function(req, res, next) {
Conference.findById(req.params.conference_id, function(err, conference) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Conference not found'] });; }
                        if (!conference) { return res.status(404).send({ errors: ['no such conference'] })};
                        conference.remove(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Sth bad happen'] });; }
                                res.status(200).json({ message: 'Conference removed!' });
                        });

                });
};