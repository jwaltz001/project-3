

/***********************************
 * Dependancies and Configurations *
 *                                 *
 ***********************************/
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const app = express();
const PORT = 3000;

console.log(process.env.MONGODB_URI);

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
const businessController = require("./controllers/business.js");
app.use("/business", businessController);

const sessionController = require("./controllers/sessions.js");
app.use("/sessions", sessionController);

/************
 * Listener *
 *          *
 ************/
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
