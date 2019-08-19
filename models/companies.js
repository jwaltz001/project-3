const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companiesSchema = Schema({
    name: {type:String, required:true},
	streetAddress: String,
	city: String,
    state: String,
	zipcode: Number,
    description: String,
	endorsements: Number,
	faves: Number,
	reviews:[ {authorId:String, rating:Number, comments:String, date:Date } ]

});

const Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;
