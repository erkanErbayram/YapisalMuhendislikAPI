const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  nameSurname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});
module.exports = User = mongoose.model("user", UserSchema);
