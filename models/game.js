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
  home: {
    type: ObjectId,
    required: true,
    ref: 'Team'
  },
  away: {
    type: ObjectId,
    required: true,
    ref: 'Team'
  },
  homeScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 200
  },
  awayScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 200
  },
  court: {
    type: ObjectId,
    required: true,
    ref: 'Court'
  }
});

module.exports = mongoose.model('Game', Game);
