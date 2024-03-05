
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "username", // Specify the field to be treated as the username
  usernameLowerCase: true, // Ensure that the username is treated as case-insensitive
  //plugin provided username kolowercase a convert karega taaki easy backend operations ho sake
});

module.exports = mongoose.model("User", userSchema);

