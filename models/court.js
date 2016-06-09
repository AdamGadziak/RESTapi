"use strict";

var validator = require('validator');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Court = new Schema({
  name: {
    type: String,
    required: true,
    validate: [ function(name) {
      return name.length >=3; 
    },
    'Name should be longer'
    ]
  },
  thumbnail: {
    type:String,
    trim: true
  },
  games: [{
    type: ObjectId,
    ref: 'Game',
    trim: true,
    required: false
  }],
  city: {
    type: ObjectId,
    ref: 'City',
    trim: true,
    required: false
  }
});

module.exports = mongoose.model('Court', Court);
