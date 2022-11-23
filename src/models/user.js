const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    min:3,
  }, 
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
},
{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)