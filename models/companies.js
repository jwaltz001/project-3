const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companiesSchema = Schema({
    name: {type:String, required:true, unique:true},
    city: String,
    state: String,
    description: String,
	reviews:[ {authorId:String, rating:Number, comments:String, date:Date } ],
	meta: { endorsements:Number, faves:Number }
});

const Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;
