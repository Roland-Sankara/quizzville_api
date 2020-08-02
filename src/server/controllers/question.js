const Question = require('../models/questionModel');
const StatusCodes = require('http-status-codes');

module.exports = {
	create                 : async (req, res) => {
		try {
			//check if question exists
			const question = await Question.findOne({ question: req.body.question });
			if (question) {
				return res.status(StatusCodes.CONFLICT).json({ error: 'Question Already exists'});
			}

			//create a question
			const newquestion = new Question({
				question          : req.body.question,
				category          : req.body.category,
				correct_answer    : req.body.correct_answer,
				incorrect_answers : req.body.incorrect_answers,
				createdBy         : req.userID,
				topic             : req.body.topic
			});
			const savedQuestion = await newquestion.save();
			console.log(savedQuestion);
			res.status(StatusCodes.OK).json({ message: 'Successfully created a question' });
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to create question, Try again later' });
		}
	},
	updateByID             : async (req, res) => {
		try {
			//query for question by ID
			const question = await Question.findOneAndUpdate({ _id: req.params.questionID }, { $set: req.body });
			if (question) {
				res.status(StatusCodes.OK).json({ message: 'Successfully updated question' });
			} else {
				res.status(StatusCodes.NOT_FOUND).json({ error: 'Question of given ID was not found' });
			}
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to update question, try again later' });
		}
	},
	getQuestionsByCategory : async (req, res) => {
		try {
			const questions = await Question.find({ category: req.params.category });
			if (questions) {
				req.quizCategory = req.body.category;
				res.status(StatusCodes.OK).json(questions);
			} else {
				res.status(StatusCodes.NOT_FOUND).json({ error: 'Questions of given category were not Found' });
			}
		} catch (error) {
			res.status(StatusCodes.NOT_FOUND).json({ error: 'Failed to get questions Of given category' });
		}
	},
	getQuestionsByTopic    : async (req, res) => {
		try {
			const questions = await Question.find({ topic: req.params.topic });
			if (questions) {
				//req.quizTopic = req.body.topic;
				res.status(StatusCodes.OK).json({ results: questions });
			} else {
				res.status(StatusCodes.NOT_FOUND).json({ error: 'Questions of given topic were not Found' });
			}
		} catch (error) {
			res.status(StatusCodes.NOT_FOUND).json({ error: 'Failed to get questions Of given topic' });
		}
	}
};
