"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type:ObjectId,
    required: true,
    ref: 'City',
    required: false
  },
  password: {
    type:String,
    required: true
  },
  thumbnail: {
    type:String,
    trim: true
  },
  mail: {
    type:String,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  }
});

module.exports = mongoose.model('User', User);
