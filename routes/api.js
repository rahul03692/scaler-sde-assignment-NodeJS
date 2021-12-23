const express = require("express");
const db = require("../models/model");

const router = express.Router();

//get
router.get("/", function (req, res, next) {
  console.log(req.params.name);
  db.find({}).then((data) => {
    res.json(data);
  });
});

//post
router.post("/", function (req, res, next) {
  console.log(req.body);
  db.create(req.body)
    .then(function (data) {
      res.send(data);
    })
    .catch(next);
});

//put
router.put("/:id", function (req, res, next) {
  db.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      db.findById({ _id: req.params.id }).then((data) => {
        res.send(data);
      });
    })
    .catch(next);
});

//delete
router.delete("/:id", function (req, res, next) {
  db.findByIdAndRemove({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports = router;
