const Result = require('../models/resultsModel');
const StatusCodes = require('http-status-codes');

module.exports = {
	Save            : async (req, res) => {
		try {
			const newScore = new Result({
				user_id      : req.userID,
				quizTopic    : req.body.topic,
				quizCategory : req.body.category,
				score        : req.body.score
			});
			const savedScore = await newScore.save();
			res.status(StatusCodes.OK).json({ message: 'Score successfully saved', savedScore });
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to save Score, Try again!!' });
		}
	},
	resultsByUserID : async (req, res) => {
		try {
			const userResults = await Result.find({ user_id: req.userID });
			if (userResults.length === 0) {
				res.status(StatusCodes.NOT_FOUND).json({ error: 'results Not Found' });
			} else {
				let score = 0;
				userResults.map((result) => {
					score += parseInt(result.score);
				});
				res.status(StatusCodes.OK).json({ result: score });
			}
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to get Results' });
		}
	}
};
