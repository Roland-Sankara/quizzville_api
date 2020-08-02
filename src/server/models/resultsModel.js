const mongoose = require('mongoose');
//import result schema
const resultSchema = require('./schemas/results');

module.exports = mongoose.model('Results', resultSchema);
