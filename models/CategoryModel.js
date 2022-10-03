const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: {
    type: String
  }, 
  isActive:{
    type:Boolean,
    default:true
  }
});

module.exports = Category = mongoose.model("category", CategorySchema);
