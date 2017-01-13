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
      return description.length >=12; 
    },
    'Description should be longer'
    ]
  },
  lng: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
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
