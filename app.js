// const express = require("express");
// const app = express();
// const dotenv = require("dotenv").config();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const methodOverride = require("method-override");
// const User = require("./models/user");

// //---------DATABASE SETUP------------------
// // const mongo_uri = process.env.mongo_uri;
// const mongo_uri = 'mongodb+srv://2023ugcm023:KKueabXgcKd9xLtv@cluster0.u8ffp0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const connect = mongoose.connect(mongo_uri);
// connect.then(
//   () => {
//     console.log("Database Connected Successfully");
//   },
//   (err) => {
//     console.log("Error occur while connecting ", err);
//   }
// );
// // --------------------------------------

// //-------------GENRAL CONFIGURATION----------
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "hbs");
// app.use(express.static(__dirname + "/public"));
// app.use(methodOverride("_method"));
// //-------------------------------------------

// //------------ROUTERS------------------------
// const commentRoutes = require("./routes/comments");
// const postRoutes = require("./routes/posts");
// const indexRoutes = require("./routes/index");
// const userRoutes = require("./routes/user");
// //---------------------------------------------

// //------------PASSPORT CONFIGURATION-----------
// app.use(
//   require("express-session")({
//     secret: "I am the best",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// //to get current logged in user
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });
// //------------------------------------------------

// app.use("/", indexRoutes);
// app.use("/posts", postRoutes);
// app.use("/posts/:id/comments", commentRoutes);
// app.use("/user", userRoutes);

// let port = process.env.PORT || 8080;

// app.listen(port, () => {
//   console.log(`Server Listening at http://localhost:${port}`);
// });

const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require("./models/user");

// --------- DATABASE SETUP ----------
const mongo_uri = "mongodb://localhost:27017/";  // Replace with your actual MongoDB URI
const connect = mongoose.connect(mongo_uri,{useNewUrlParser:true,useUnifiedTopology:true});
connect.then(
  () => {
    console.log("Database Connected Successfully");
  },
  (err) => {
    console.log("Error occurred while connecting ", err);
  }
);
// ----------------------------------

// ---------- GENERAL CONFIGURATION ----------
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// ------------------------------------------

// ---------- PASSPORT CONFIGURATION ----------
app.use(
  require("express-session")({
    secret: "I am the best",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// To get the current logged-in user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
// --------------------------------------------

// ---------- ROUTERS ----------
const commentRoutes = require("./routes/comments");
const postRoutes = require("./routes/posts");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");

app.use("/", indexRoutes);
app.use("/posts/:id/comments", commentRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
// -----------------------------

let port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`);
});