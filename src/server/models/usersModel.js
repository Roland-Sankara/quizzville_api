const mongoose = require('mongoose');

//importing User schema
const userSchema = require('./schemas/users');
module.exports = mongoose.model('User', userSchema);
