"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Game = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  slots: {
    type: Number,
    required: true
  },
  freeSlots: {
    type: Number,
    required: true
  },
  court: {
    type: ObjectId,
    required: true,
    ref: 'Court'
  },
  city: {
    type:ObjectId,
    required: true,
    ref: 'City'
  }
});

module.exports = mongoose.model('Game', Game);
