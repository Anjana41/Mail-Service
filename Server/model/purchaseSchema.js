const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
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
    default:0

  },
  transaction_id: {
    type: String,
    required: true,
    default:0
  },
  plan_name: {
    type: String,
    required: true,
  },
  plan_price: {
    type: String,
    required: true,
  },
  email_limit: {
    type: String,
    required: true,
  },
  email_used:{
    type:String,
    required:true,
    default:0
  },
  list_limit: {
    type: String,
    required: true,
  },
  list_used:{
    type:String,
    required:true,
    default:0
  },
  date: {
    type: String,
    required: true,
  },
 
  
 

});

const Purchase = mongoose.model("purchases", purchaseSchema);

module.exports = Purchase;
