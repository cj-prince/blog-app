const mongoose = require('mongoose');

const connectDB = (url) => {
  url = process.env.MONGO_URI;
  return mongoose.connect(url, (error, result) => {
    if(error){
      console.log('connection failed')
    }else{
      console.log('connected to Database');
      return result
    }
   
  });
};
module.exports = connectDB;
