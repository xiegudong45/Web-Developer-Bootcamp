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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/posts");

var User = require("./models/user")

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

Post.create({
   title: "How to cook the best burger pt.4",
   content: "blah davdav"
}, function (err, post) {
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function (err, data) {
               if (err) {
                   console.log(err);
               } else {
                   console.log(data);
               }
            });
        }
    });
});

// Find user
// find all posts for that user
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function (err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

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
