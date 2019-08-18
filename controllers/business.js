const express = require("express");
const router = express.Router();
const Townies = require("../models/companies.js");


///////////////////////ROUTES////////////////////////////

//Create
router.post("/", (req,res) => {
  	Townies.create(req.body, (error, createdTownie) => {
    res.json(createdTownie);
  });
});

//Index
router.get("/", (req, res) => {
	Townies.find({}, (error, allTownies) => {
		res.json(allTownies)
  });
});


///show
router.get("/:id", (req, res) => {
	console.log("Townie to show 2 (get route id):", req.params.id);
  Townies.findById(req.params.id, (error, showtownie) => {
    res.json(showtownie)
  })
})

//Update
router.put("/:id", (req, res) => {
	console.log("Edit Route 2 (id in route of company to edit):", req.params.id);
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
