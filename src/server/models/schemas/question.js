const { Schema } = require('mongoose');

const question = new Schema(
	{
		category          : {
			type     : String,
			required : true
		},
		type              : {
			type     : String,
			default  : 'multiple',
			required : false
		},
		question          : {
			type     : String,
			required : true
		},
		correct_answer    : {
			type     : String,
			required : true
		},
		incorrect_answers : {
			type     : Array,
			required : true
		},
		createdBy         : {
			type     : String,
			required : true
		},
		topic             : {
			type     : String,
			required : true
		}
	},
	{ timestamps: true } //adds the createdAt and UpadatedAt fileds
);

module.exports = question;
