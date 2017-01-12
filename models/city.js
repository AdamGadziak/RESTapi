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
   	trim: true,
    required: false
  }],
  courts: [{
   	type: ObjectId,
   	ref: 'Court',
   	trim: true,
    required: false
  }],
  users: [{
   	type: ObjectId,
   	ref: 'User',
   	trim: true,
    required: false
  }]
});

module.exports = mongoose.model('City', City);
