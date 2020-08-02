const Joi = require('@hapi/joi');

module.exports = {
	questionSchema : Joi.object({
		question          : Joi.string().min(8).message('question must be a min of 8 characters').required(),
		category          : Joi.string().required(),
		correct_answer    : Joi.string().min(1).required(),
		incorrect_answers : Joi.array().items(Joi.string().min(1).required()).required(),
		topic             : Joi.string().min(2).required()
	})
};
