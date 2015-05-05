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
  city: {
    type: String,
    required: true,
    validate: [ function(name) {
      return name.length >=3; 
    },
    'City should be longer'
    ]
  }
});

module.exports = mongoose.model('Court', Court);
