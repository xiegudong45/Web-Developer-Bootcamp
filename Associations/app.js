var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost/blog_demo");

// POST
var postSchema = new mongoose.Schema({
  title: String,
  content: String,

});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);




// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });
//
// newUser.posts.push({
//   title: "How to bre polyjuice potion",
//   content: "Just kidding. Go to potions class to learn it!"
// });
//
// newUser.save(function (err, user) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

User.findOne({name: "Hermione Granger"}, function (err, user) {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "3 Things I really hate",
      content: "Voldemort. Voldemort. Voldemort."
    });
    user.save(function(err, user) {
      if(err) {
        console.log(err);
      } else {
        console.log(user);
      }
    })
  }
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
