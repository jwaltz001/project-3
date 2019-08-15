const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companiesSchema = Schema({
    name: String,
    city: String,
    state: String,
    description: String
});

const Companies = mongoose.model('User', companiesSchema);

module.exports = Companies;
