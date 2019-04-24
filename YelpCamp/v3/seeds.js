var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var campgrounds = [
  {
      name: "adamv",
      image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg",
      description: "abc"
  },
  {
      name: "adadaf",
      image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg",
      description: "def"
  },
  {
      name: "wqre",
      image: "https://farm2.staticflickr.com/1720/24657680205_a7f5a4fc36.jpg",
      description: "ghi"
  }
];


function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
    });
    // add a few campgrounds
    campgrounds.forEach(function (seed) {
        Campground.create(seed, function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log("added a campground");
                // create a comment
                Comment.create({
                    text: "This place is great",
                    author: "Homer"
                }, function (err, comment) {
                    if (err) {
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Create new comment");
                    }
                });
            }
        });
    });
}

module.exports = seedDB;
