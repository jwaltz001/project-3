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

/////////////routes????//////
app.get('/app', (req, res)=>{
    //test if user has logged in
    if(req.session.currentUser){
        //if so, show the "main app"
        res.json(req.session.currentUser);
    } else {
        //if not, redirect to log in page
        res.status(401).json({
          status:401,
          message:'not logged in'
        });
    }
});

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
