const { Schema } = require('mongoose');

const results = new Schema(
	{
		user_id      : {
			type     : String,
			required : true
		},
		quizTopic    : {
			type     : String,
			required : true
		},
		score        : {
			type     : String,
			required : true
		},
		quizCategory : {
			type     : String,
			required : true
		}
	},
	{ timestamps: true }
);

module.exports = results;
