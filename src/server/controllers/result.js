const Results = require('../models/resultsModel');
const Records = require('../models/recordsModel');
const User = require('../models/usersModel');
const StatusCodes = require('http-status-codes');

module.exports = {
	Save            : async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.userID });
			const record = await Records.findOne({ username: user.username });
			if (record && record.topics.includes(req.body.topic) === true) {
				res.status(StatusCodes.OK).json({ message: "You've Done this Quiz Before!!\nWon't Save new Score" });
			} else {
				const newScore = new Results({
					user_id      : req.userID,
					quizTopic    : req.body.topic,
					quizCategory : req.body.category,
					score        : req.body.score
				});
				const savedScore = await newScore.save();
				res.status(StatusCodes.OK).json({ message: 'Score successfully saved', savedScore });
			}
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to save Score, Try again!!' });
		}
	},
	resultsByUserID : async (req, res) => {
		try {
			const userResults = await Results.find({ user_id: req.userID });
			if (userResults.length === 0) {
				res.status(StatusCodes.NOT_FOUND).json({ error: 'results Not Found' });
			} else {
				let score = 0;
				userResults.map((result) => {
					score += parseFloat(result.score);
				});
				res.status(StatusCodes.OK).json({ result: score });
			}
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to get Results' });
		}
	}
};
