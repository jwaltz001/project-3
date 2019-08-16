const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const towniesSchema = require("./companies.js").schema;

const userSchema = Schema({
    username: {type:String, unique:true, required:true},
    password: {type:String, required:true},
	towniesFollowed:[towniesSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
