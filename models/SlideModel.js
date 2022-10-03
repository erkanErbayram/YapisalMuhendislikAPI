const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
  image: {
    type: String,
  },
  showMainPage: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports = Slides = mongoose.model("slides", SlideSchema);
