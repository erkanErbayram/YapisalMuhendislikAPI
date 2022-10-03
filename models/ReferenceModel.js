const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferenceSchema = new Schema({
  companyName: {
    type: String,
  },
  image:{
    type:String
  },
  isActive:{
    type:Boolean,
    default:true
  }
});
module.exports = Reference = mongoose.model("reference", ReferenceSchema);
