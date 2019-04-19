var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

var campgrounds = [
  {name: "adamv", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
  {name: "adamv", image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg"},
  {name: "adamv", image: "https://farm2.staticflickr.com/1720/24657680205_a7f5a4fc36.jpg"}
];

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {

  // get data from form and add campgrounds to array
  let name = req.body.name;
  let img = req.body.image;
  let newCampground = {name: name, image: img}
  campgrounds.push(newCampground);
  // redirect to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
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
