var mongoose = require('mongoose'),
    City = mongoose.model('City');
//GET ALL CONFERENCES
exports.showall = function(req, res, next) {
  var query = req.query;
  City.find(query, function(err, cities) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err){
                console.log(err);
        return res.status(404).send({ errors: ['Cities not found'] });
      }
      res.json(cities); // return all pandas in JSON format
    });
};
//GET CONFERENCE BY ID
exports.show = function(req, res) {
    City.findById(req.params.city_id).populate('team').exec(function(err, city) {
            if (err){
                console.log(err);
                return res.status(404).send({ errors: ['Couldn\' find city with this id'] });
            }
            if (!city) { return res.status(404).send({ errors: ['no such city'] })};
            res.json(city);
      });
};
//POST CONFERENCE
exports.create = function(req, res) {
  var city = new City(req.body);

    city.save(function(err) {
      if (err){
                console.log(err);
        return res.status(422).send({ errpr: ['Invalid data input!!!']});
      }
      res.status(201).send({ message: 'City Added' });
    });
};

//PUT CONFERENCE
exports.update = function(req, res, next) {
   City.findById(req.params.city_id, function(err, city) {
                        if (err) {
                                console.log(err);
                                return res.status(404).send({ errors: ['City not found'] });
                        }
                        if (!city) { return res.status(404).send({ errors: ['no such city'] })};
                        for (prop in req.body) {
                  city[prop] = req.body[prop];
              }
                        city.save(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Validation error'] });; }
                                res.status(200).json({ message: 'City updated!' });
                        });

                });
};
//REMOVE CONFERENCE
exports.destroy = function(req, res, next) {
City.findById(req.params.city_id, function(err, city) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['City not found'] });; }
                        if (!city) { return res.status(404).send({ errors: ['no such city'] })};
                        city.remove(function(err) {
                        if (err) { console.log(err); return res.status(404).send({ errors: ['Sth bad happen'] });; }
                                res.status(200).json({ message: 'City removed!' });
                        });

                });
};