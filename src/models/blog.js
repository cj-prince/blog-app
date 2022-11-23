const mongoose = require('mongoose')

let blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
},
{ timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema)