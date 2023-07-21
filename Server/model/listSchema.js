const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const listSchema = new mongoose.Schema({
  listname: {
    type: String,
    required: true,
  },

  // userid: {
  //   type: String,
  //   required: true,
  // },
  userid: {
     type: mongoose.Schema.ObjectId, 
     required: true 
    },

  url: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },

});

// hashing the password

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();
// });

//generating token

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//      this.tokens = this.tokens.concat({token:token});
//      await this.save();
//      return token;

//   } catch (err) {
//     console.log(err);
//   }
// };

const List = mongoose.model("lists", listSchema);

module.exports = List;
