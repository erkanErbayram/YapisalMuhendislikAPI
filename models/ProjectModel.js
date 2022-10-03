const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  squareMeters: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image:{
    type:Array
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required:true
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    
  },
  isActive:{
    type:Boolean,
    default:true
  }
});

module.exports = Projects = mongoose.model("projects", ProjectSchema);
