var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOveride = require('method-override');
var flash = require('connect-flash');


// requiring routes
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');


// seedDB(); // seed the database
var app = express();

// view engine setup
mongoose.connect("mongodb://localhost/yelp_camp_v11", {useNewUrlParser: true});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOveride("_method"));
app.use(flash());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// SCHEMA SETUP

// Campground.create(
//     {
//         name: "adadaf",
//         image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg",
//         description: "This is abc"
//     }
//     , function (err, campground) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log("Newly created campground: ");
//         console.log(campground);
//       }
//     });

// Passport configuration
app.use(require("express-session") ({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("The YelpCamp App has been launched!");
});


module.exports = app;
