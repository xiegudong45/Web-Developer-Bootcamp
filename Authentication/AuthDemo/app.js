var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var User = require('./models/user');
var passportLocalMongoose = require('passport-local-mongoose');

var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

mongoose.connect("mongodb://localhost/auth_demo_app");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: "xiegudong456",
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============
// ROUTES
// =============

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
  res.render("secret");
});

//
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect('/secret');
    });
  });
});

// login routes

// render login form
app.get("/login", function (req, res) {
  res.render('login');
});

// login logic
app.post("/login", passport.authenticate('local', {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function (req, res) {

});

// logout

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("Server started");
});



module.exports = app;