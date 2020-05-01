var express = require("express");
var app = express();
var itemRoutes = express.Router();
// Require Item model in our routes module
var Item = require("../models/Item");

itemRoutes.route("/add").post(function(req, res) {
  var item = new Item(req.body);
  item
    .save()
    .then((item) => {
      res
        .status(200)
        .json({
          function: "add item",
          info: "item added successfully",
          item: item,
        });
    })
    .catch((err) => {
      s;
      res
        .status(400)
        .json({
          function: "add item",
          info: "iten can not added into database",
        });
    });
});

// Defined get data(index or listing) route
itemRoutes.route("/").get(function(req, res) {
  Item.find(function(err, items) {
    if (err) {
      console.log("error in listing items");
    } else {
      res.json(items);
    }
  });
});

// Defined edit route
itemRoutes.route("/edit/:id").get(function(req, res) {
  var id = req.params.id;
  Item.findById(id, function(err, item) {
    try {
      res.json(item);
    } catch (error) {
      console.log("error:", err);
    }
  });
});

//Defined update route
itemRoutes.route("/update/:id").post(function(req, res) {
  Item.findById(req.params.id, function(error, item) {
    if (!item) {
      return next(new Error("Could't find the file"));
    } else {
      item.name = req.body.name;
      item.price = req.body.price;
      item
        .save()
        .then((item) => {
          res.json({ info: "updated successfully", data: item });
        })
        .catch((err) => {
          res.status(400).send("Unable to update the database.");
        });
    }
  });
});
//// Defined delete | remove | destroy route
itemRoutes.route("/delete/:id").get(function(req, res) {
  Item.findByIdAndRemove({ _id: req.params.id }, function(err, item) {
    if (err) res.json(err);
    else res.json("Removed successfully");
  });
});
module.exports = itemRoutes;
