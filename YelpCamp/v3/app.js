var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");

seedDB();
var app = express();

// view engine setup
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
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




app.get("/", function(req, res) {
  res.render("landing");
});

// INDEX show all campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {

  // get data from form and add campgrounds to array
  let name = req.body.name;
  let img = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: img, description: desc}
  // Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });

  // redirect to campgrounds page

});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.get("/campgrounds/:id", function (req, res) {
  // find the campground with ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("show", {campground: foundCampground});
    }
  });

  // render show template with that campground
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("The YelpCamp App has been launched!");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
