const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const User = new Schema(
	{
		username  : {
			type     : String,
			required : true
		},
		password  : {
			type     : String,
			required : true,
			set      : (value) => {
				return bcrypt.hashSync(value, 10);
			}
		},
		contact   : {
			type     : String,
			required : true
		},
		userlevel : {
			type     : String,
			required : false,
			default  : 1
		}
	},
	{ timestamps: true }//adds the createdAt and UpadatedAt fields
);

module.exports = User;
