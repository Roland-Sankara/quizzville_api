const Joi = require('@hapi/joi');

module.exports = {
	signUpSchema      : Joi.object({
		username : Joi.string().regex(/[a-zA-Z0-9]{3,}/).message('Username name must be text of min 3 characters').required(),
		password : Joi.string()
			.regex(/[a-zA-Z0-9-_+@]/)
			.message('Password must be a string of letters, dash, underscore, plus and @ characters')
			.required(),
		contact  : Joi.string().regex(/([0-9+]{8,}$)/)
	}),
	loginSchema      : Joi.object({
		username : Joi.string().regex(/[a-zA-Z0-9]{3,}/).message('Username name must be text of min 3 characters').required(),
		password : Joi.string()
			.regex(/[a-zA-Z0-9-_+@]/)
			.message('Password must be a string of letters, dash, underscore, plus and @ characters')
			.required(),
		contact  : Joi.string().regex(/([0-9+]{8,}$)/)
	}),
	userUpdateSchmema : Joi.object({
		username : Joi.string().regex(/[a-zA-Z0-9]{3,}/).message('Username name must be text of min 3 characters'),
		password : Joi.string()
			.regex(/[a-zA-Z0-9-_+@]/)
			.message('Password must be a string of letters, dash, underscore, plus and @ characters'),
		contact  : Joi.string().regex(/([0-9+]{8,}$)/)
	})
};
