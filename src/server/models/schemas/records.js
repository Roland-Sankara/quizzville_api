const { Schema } = require('mongoose');

const records = new Schema(
	{
		username : {
			type     : String,
			required : true
		},
		score    : {
			type     : String,
			required : true
		},
		topics   : {
			type     : Array,
			required : true
		}
	},
	{ timestamps: true }
);

module.exports = records;
