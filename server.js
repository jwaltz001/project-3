/***********************************
 * Dependancies and Configurations *
 *                                 *
 ***********************************/
// console.log(process.env.PORT);
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;
const db = mongoose.connection;

/**************
 * Middleware *
 *            *
 **************/
app.use(express.static('public'));
app.use(express.json());
app.use(session({
	// secret: process.env.SECRET,
  secret: "keepitsecret",
	resave: false,
	saveUninitialized: false
}));

/************
 * Database *
 *          *
 ************/
// const MONGODB_URI = process.env.MONGODB_URI;
const mongodbURI = "mongodb+srv://jwaltz001:Stitch2019@local-business-duuiv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongodbURI, {useNewUrlParser: true});
db.on('connected', () => console.log('mongo connected:'));

/***************
 * Controllers *
 *             *
 ***************/
const userController = require("./controllers/business.js");
app.use("/reviews", userController);

const sessionController = require("./controllers/sessions-users.js");
app.use("/sessions", sessionController);

/************
 * Listener *
 *          *
 ************/
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
