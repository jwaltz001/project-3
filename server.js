const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGOOSE_URI, {useNewUrlParser: true});

db.on('connected', () => console.log('mongo connected:'));

app.use(express.static('public'));
app.use(express.json());
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

const userController = require("./controllers/reviews.js");
app.use("/reviews", userController);

const sessionController = require("./controllers/sessions.js");
app.use("/sessions", sessionController);

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
