var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
// INDEX show all campgrounds
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB
router.post("/", function(req, res) {

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
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
    // find the campground with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });

    // render show template with that campground
});

module.exports = router;

