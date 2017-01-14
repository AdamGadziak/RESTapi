var mongoose = require('mongoose'),
    Court = mongoose.model('Court');
//GET ALL COURTS
exports.showall = function(req, res, next) {
  var query = {};
  if (req.query.city) {
    query.city = req.query.city;
  }
  console.log(query);
  Court.find(query, function(err, courts) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err){
                console.log(err);
        return res.status(404).send({ errors: ['Courts not found'] });
      }
      res.json(courts);
    });
};
//GET COURT BY ID
exports.show = function(req, res) {//deleting populate
    Court.findById(req.params.court_id).exec(function(err, court) {
            if (err){
                console.log(err);
                return res.status(404).send({ errors: ['Couldn\' find court with this id'] });
            }
            if (!court) { return res.status(404).send({ errors: ['no such court'] })};
            res.json(court);
      });
};
//POST COURT
exports.create = function(req, res) {
  if (!req.user || !req.user.isEmailVerified) {
    return res.status(401).json({
      message: 'Permission Denied! Please verify Your email'
    });
  }
  var court = new Court(req.body);

    court.save(function(err) {
      if (err){
                console.log(err);
        return res.status(422).send({ errpr: ['Invalid data input!!!']});
      }
      res.status(201).send({ message: 'Court Added' });
    });
};

//PUT COURT
exports.update = function(req, res, next) {
   Court.findById(req.params.court_id, function(err, court) {
                        if (err) {
                                console.log(err);
                                return res.status(404).send({ errors: ['Court not found'] });
                        }
                        if (!court) { return res.status(404).send({ errors: ['no such court'] })};
                        for (prop in req.body) {
                  court[prop] = req.body[prop];
              }
                        court.save(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Validation error'] });; }
                                res.status(200).json({ message: 'Court updated!' });
                        });

                });
};
//REMOVE COURT
exports.destroy = function(req, res, next) {
Court.findById(req.params.court_id, function(err, court) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Court not found'] });; }
                        if (!court) { return res.status(404).send({ errors: ['no such court'] })};
                        court.remove(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Sth bad happen'] });; }
                                res.status(200).json({ message: 'Court removed!' });
                        });

                });
};