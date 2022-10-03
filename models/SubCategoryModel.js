const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subCategoryName: {
    type: String,
  },
  isActive:{
    type:Boolean,
    default:true
  }
});
module.exports = SubCategory = mongoose.model("subCategory", SubCategorySchema);
