"use strict";

var validator = require('validator');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Court = new Schema({
  description: {
    type: String,
    required: true,
    validate: [ function(description) {
      if (description.length <120 || description.length >=12) {
        return true;
      }
      return false; 
    },
    'Description should be from 12 to 120 char length'
    ]
  },
  name: {
    type: String,
    required: true,
    validate: [ function(name) {
      return name.length >=3; 
    },
    'Name should be longer'
    ]
  },
  lng: {
    type: Number,
    required: true,
    validate: [ function(lng) {
      if (+lng <= 180 || +lng >= -180) {
        return true;
      }
      return false; 
    },
    'provide correct longitude'
    ]
  },
  lat: {
    type: Number,
    required: true,
    validate: [ function(lat) {
      if (+lat <= 90 || +lat >= -90) {
        return true;
      }
      return false; 
    },
    'provide correct latitude'
    ]
  },
  thumbnail: {
    type:String,
    trim: true
  }
  // games: [{
  //   type: ObjectId,
  //   ref: 'Game',
  //   trim: true,
  //   required: false
  // }],
  // city: {
  //   type: ObjectId,
  //   ref: 'City',
  //   trim: true,
  //   required: false
  // }
});

module.exports = mongoose.model('Court', Court);
