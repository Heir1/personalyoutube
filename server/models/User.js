const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  channelid: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    default : "https://linkedin.com"
  },
  twitter: {
    type: String,
    default : "https://facebook.com"
  },
  facebook: {
    type: String,
    default : "https://facebook.com"
  },
  instagram: {
    type: String,
    default : "https://instagram/com"
  }

});

const User = mongoose.model("User", UserSchema);
module.exports = User;

// name
// channel
// image
// linkedIn
// twitter
// facebook
// instagram