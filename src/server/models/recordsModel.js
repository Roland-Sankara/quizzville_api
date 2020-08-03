const mongoose = require('mongoose');

//import records schema
const recordSchema = require('./schemas/records');
module.exports = mongoose.model('Records', recordSchema);
