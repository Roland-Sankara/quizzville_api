const Records = require('../models/recordsModel');
const User = require('../models/usersModel');
const StatusCodes = require('http-status-codes');

module.exports = {
	saveRecord      : async (req, res) => {
		try {
			//get the user by the given username
			const user = await User.findOne({ _id: req.userID });
			//check whether the user exists
			const userRecord = await Records.findOne({ username: user.username });
			if (userRecord) {
				//Update the user record
				await Records.findOneAndUpdate(
					{ username: userRecord.username },
					{
						username : userRecord.username,
						score    : req.body.score,
						topics   : userRecord.topics.concat(req.body.topics)
					}
				);
				console.log('updated user record');
			} else {
				//Else save the new user record
				const newRecord = new Records({
					username : user.username,
					score    : req.body.score,
					topics   : req.body.topics
				});
				const saved = await newRecord.save();
				res.status(StatusCodes.OK).json({ message: 'Successfully saved user record', saved });
			}
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to save the user record ! ! !' });
		}
	},
	getUsersRecords : async (req, res) => {
		try {
			//get all the users in tha database records
			const records = await Records.find();
			if (records.length > 0) {
				res.status(StatusCodes.OK).json({ results: records });
			} else {
				res.status(StatusCodes.NOT_FOUND).json({ error: 'User records Not Found ! ! !' });
			}
		} catch (error) {
			res.status(StatusCodes.EXPECTATION_FAILED).json({ error: 'Failed to get records' });
		}
	}
};
