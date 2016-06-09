"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var City = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  games: [{
 	type: ObjectId,
 	ref: 'Game',
 	trim: true
  }],
  courts: [{
 	type: ObjectId,
 	ref: 'Court',
 	trim: true
  }],
  users: [{
 	type: ObjectId,
 	ref: 'User',
 	trim: true
  }]
});

module.exports = mongoose.model('City', City);
