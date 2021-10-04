const mongoose = require("mongoose");

//create schema
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
      type:String,
      required:true
  },
  joinDate: {
      type:Date,
      required:true,
      default:Date.now
  },
  email: {
      type:String,
      required:true
  }
  
});


module.exports = mongoose.model("Students", studentsSchema);