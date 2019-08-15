// console.log(process.env.PORT);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const db = mongoose.connection;
require('dotenv').config()


const PORT = process.env.PORT || 3000;

// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = "mongodb+srv://Justin:Stitch2019@local-business-duuiv.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

db.on('connected', () => console.log('mongo connected:'));

app.use(express.static('public'));
app.use(express.json());
app.use(session({
	// secret: process.env.SECRET,
  secret: "keepitsecret",
	resave: false,
	saveUninitialized: false
}));

const userController = require("./controllers/business.js");
app.use("/reviews", userController);

const sessionController = require("./controllers/sessions.js");
app.use("/sessions", sessionController);

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
