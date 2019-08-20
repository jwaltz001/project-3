/***********************************
 * Dependancies and Configurations *
 *                                 *
 ***********************************/
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const https = require('https');
const app = express();
const PORT = process.env.PORT;

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


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//
// app.all('/*', function (request, response, next) {
// 	  response.header("Access-Control-Allow-Origin", "*");
// 	  response.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	  response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
// 	  next();
//   });
// app.get("/yelp", (req,res) => {
// 	//req.data.url
// 	console.log(req.headers);
// 	console.log(req.data.Authorization);
// request.header('Authorization', 'Bearer nSZt3_3hdEoT09d9VuVMUbkQUz7JIViAKxl_DLMSpwmuMkD6CWPhaOOA62rf5qExfj7q8pDw07FRfxQw3ibkR-PpIAMggNu4manvUY2af0dRP9sBJVU1SCmzSpRYXXYx');
//
// 	https.get('https://api.yelp.com/v3/businesses/search?limit=10&term=marcos&location=springtx',  (res) => {
// 		let data = '';
//
// 		// A chunk of data has been recieved.
// 		res.on('data', (chunk) => {
// 			data += chunk;
// 		});
//
// 		// The whole response has been received. Print out the result.
// 		res.on('end', () => {
// 			console.log(JSON.parse(data).explanation);
// 		});
//
// 	}).on("error", (err) => {
// 		console.log("Error: " + err.message);
// 	});
// })
