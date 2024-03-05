const mongoose = require("mongoose");
//mongoose is object data modelling(ODM) library
//definekar rahe hai hum current model ka schema
var commentSchema = mongoose.Schema({            //commentschem ais the name of comment ka joh object type banaya hai
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
