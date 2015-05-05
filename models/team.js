"use strict";

var validator = require('validator');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Team = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: [ function(name) {
      return name.length >=3; 
    },
    'Name should be longer'
    ]
  },
  city: {
    type: String,
    required: true,
  },
  conference: {
    type: ObjectId,
    ref: 'Conference',
    required: true,
    trim: true
  },
  players: [{
    type: ObjectId,
    ref: 'Players',
    trim: true
  }]
});

module.exports = mongoose.model('Team', Team);
