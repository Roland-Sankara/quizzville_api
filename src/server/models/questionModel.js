const mongoose = require('mongoose');

//import Schema
const questionSchema = require('./schemas/question');
module.exports = mongoose.model('Question', questionSchema);
