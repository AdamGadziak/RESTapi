"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Conference = new mongoose.Schema({
  name: {
  	type: String,
  	required: true,
  	enum: ['EAST', 'WEST', 'NORTH', 'SOUTH']
  },
  teams: [{
 	type: ObjectId,
 	ref: 'Team',
 	trim: true
 }]
});

module.exports = mongoose.model('Conference', Conference);
