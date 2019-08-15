const express = require("express");
const router = express.Router();
const Townies = require("../models/users.js");


///////////////////////ROUTES////////////////////////////

//Create
router.post("/", (req,res) => {
	res.send("post")
  // Townies.create(req.body, (error, createdTownie) => {
  //   res.json(createdTownie);
  // });
});

//Index
router.get("/", (req, res) => {
 	res.send("get")
  //});
});

//Update
router.put("/:id", (req, res) => {
	res.send("put")
  //});
});

//Delete
router.delete("/:id", (req, res) => {
	res.send("delete")
  //});
});

module.exports = router;
