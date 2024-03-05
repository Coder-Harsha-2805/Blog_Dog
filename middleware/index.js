const Post = require("../models/post");
const Comment = require("../models/comment");

// middleware yaha jata hai
// middleware ko use karte hai to execute code during the request-response cycle
//to declare empty js object called middleware object
var middlewareObj = {};
//to check ki kiska post hai
middlewareObj.checkPostOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Post.findById(req.params.id, (err, foundPost) => { //req.params.id ko parameter ki value dynamically lene ke liye use karte hai
      if (err) {
        res.redirect("back");
      } else {
        //kya yeh user ka hi post hai
        if (foundPost.author.id.equals(req.user._id)) {
          next();   //agla call hone ko allow karo
        } else {
          res.redirect("back");   //agar user ka nahi hai toh wapas peeche page par jao
        }
      }
    });
  } else {
    res.redirect("back");      //agar user ka nahi hai toh wapas peeche page par jao
  }
};

//isme sab kuch same same hai sirf difference itna hai ki yeh comments ke liye work karta hai
middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect("back");
      } else {
        
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

//yeh middle ware function hai is logged in to check ki yahi ha na current user
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();    //agar current user hai toh allow karo next functions ke liue 
  } 
  res.redirect("/login");  //otherwise login page par redirect kro
};

module.exports = middlewareObj;

