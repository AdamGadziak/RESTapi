"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Player = new Schema({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: ObjectId,
    ref: 'Team',
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    min: 0,
    max: 150
  },
  height: {
    type: Number,
    default: 0,
    min: 0,
    max: 250
  },
  role: {
    type: String,
    required: true,
    validate: [ function(name) {
      return role.match(/(PG|SG|SF|PF|C)/); 
    },
    'Role should be PG SG SF PF C'
    ]
  }
});

module.exports = mongoose.model('Player', Player);
