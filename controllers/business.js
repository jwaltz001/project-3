const express = require("express");
const router = express.Router();
const Townies = require("../models/users.js");


///////////////////////ROUTES////////////////////////////

//Create
router.post("/", (req,res) => {
  Townies.create(req.body, (error, createdTownie) => {
      res.json(createdTownie);
  });
});

//Index
router.get("/", (req, res) => {

  });
});

//Update
router.put("/:id", (req, res) => {

  });
});

//Delete
router.delete("/:id", (req, res) => {

  });
});

module.exports = router;
