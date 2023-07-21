const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');

const planSchema = new mongoose.Schema({
  plan_name: {
    type: String,
    required: true,
  },
  plan_type: {
    type: String,
    required: false,
  },
  emails: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lists: {
    type: Number,
    required: true,
  },
  listemails: {
    type: Number,
    required: true,
  },
});



const Plan = mongoose.model("plans", planSchema);

module.exports = Plan;
