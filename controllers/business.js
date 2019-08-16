const express = require("express");
const router = express.Router();
const Townies = require("../models/users.js");


///////////////////////ROUTES////////////////////////////

//Create
router.post("/", (req,res) => {
<<<<<<< HEAD
  Townies.create(req.body, (error, createdTownie) => {
      res.json(createdTownie);
=======
	res.send("post")
  	Townies.create(req.body, (error, createdTownie) => {
    res.json(createdTownie);
>>>>>>> a0e70911c94f75227ac774ab852e6d23dfc47497
  });
});

//Index
router.get("/", (req, res) => {
	Townies.find({}, (error, allTownies) => {
		res.json(allTownies)
  });
});

//Update
router.put("/:id", (req, res) => {
	Townies.findByIdAndUpdate(req.params.id, req.body, (error, updatedTownie) => {
		res.json(updatedTownie)
  });
});

//Delete
router.delete("/:id", (req, res) => {
	Townies.findByIdAndRemove(req.params.id, (deletedTownie) => {
		res.json(deletedTownie);
  });
});

module.exports = router;
