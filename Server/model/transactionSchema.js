const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId, 
    required: true,
  },
  plan_id: {
    type: mongoose.Schema.ObjectId, 
    required: true,
  },
  sub_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
 
 
  
 

});

const Transaciton = mongoose.model("transactions", transactionSchema);

module.exports = Transaciton;
