/***********************************
 * Dependancies and Configurations *
 *                                 *
 ***********************************/
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config()
const app = express();
const PORT = 3000;

const db = mongoose.connection;
/**************
 * Middleware *
 *            *
 **************/
app.use(express.static('public'));
app.use(express.json());
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

/************
 * Database *
 *          *
 ************/

const mongodbURI = process.env.MONGODB_URI;
mongoose.connect(mongodbURI, {useNewUrlParser: true});
db.on('connected', () => console.log('mongo connected:'));

/***************
 * Controllers *
 *             *
 ***************/
const userController = require("./controllers/business.js");
app.use("/business", userController);

const sessionController = require("./controllers/sessions-users.js");
app.use("/sessions", sessionController);

/************
 * Listener *
 *          *
 ************/
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
