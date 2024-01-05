const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
   name:{
     type:String,
     required:true
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password: {
    type: String,
    required:true,
  },
  googleId: {
    type: String
  },
   date:{
    type:Date,
    default:Date.now
   }
})

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

// Return JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};


// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('user',userSchema);
module.exports = User;