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

//New User Review
router.patch('/userreviews/:companyid', (req,res) => {
	console.log("review route 2 (company id in params):", req.params.companyid);
	console.log("2.5 comments", req.body.comments);
	const newReview = {
		authorId: req.session.currentUser._id,
		rating: req.body.rating,
		comments: req.body.comments,
		date: req.body.date,
	}
	console.log("review route 3 (new review in route):", newReview);
	Townies.findByIdAndUpdate(req.params.companyid, {$push: {reviews:newReview}}, {new:true}, (err, updatedTownie) => {
		console.log("review route 4 (townie updated with review):", updatedTownie);
		res.json(updatedTownie)
	})
})
//New endorsements
router.patch("/approve/:companyid", (req,res) => {
	Townies.findById(req.params.companyid, (err, foundTownie) => {
		foundTownie.endorsements ++;
		foundTownie.save();
		res.json(foundTownie);
	})
})
//Index
router.get("/", (req, res) => {
	Townies.find({}, (error, allTownies) => {
		res.json(allTownies)
  });
});


///show
router.get("/:id", (req, res) => {
	//console.log("Townie to show 2 (get route id):", req.params.id);
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
