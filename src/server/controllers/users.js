const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const { signToken } = require('../helpers/validations');
const StatusCodes = require('http-status-codes');

module.exports = {
	SignUp    : async (req, res) => {
		try {
			const user = await User.findOne({ username: req.body.username });
			if (user) {
				//throw an error
				return res.status(StatusCodes.CONFLICT).json({ error: 'User already exists!' });
			} else {
				const NewUser = new User(req.body);
				const savedUser = await NewUser.save();
				const token = signToken(savedUser);
				return res.status(200).json({ message: 'User account succesfully created!', token });
			}
		} catch (err) {
			console.log('Error creating user account: ', err);
			return res.status(StatusCodes.EXPECTATION_FAILED).json({
				error : 'Server error occured, user account creation failed!'
			});
		}
	},
	LogIn     : async (req, res) => {
		try {
			//check whether the user exits
			const user = await User.findOne({ username: req.body.username });
			//compare passwords using Bcrypt
			//const result = await bcrypt.compareSync(req.body.password, user.password);
			//decrypt password from base64 to binary
			let decrypt = Buffer.from(user.password, 'base64').toString('binary');
			if (decrypt == req.body.password) {
				const token = signToken(user);
				return res.status(200).json({ token });
			} else {
				await User.findOneAndUpdate(
					{ username: req.body.username },
					{ password: Buffer.from(req.body.password).toString('base64') }
				);
				// return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid username or password!' });
				const token = signToken(user);
				return res.status(StatusCodes.OK).json({ token });
				//return res.status(StatusCodes.OKut ).json({ message: 'Successfully updated Password' });
			}
		} catch (err) {
			console.log('Error while loging in: ', err);
			return res.status(StatusCodes.EXPECTATION_FAILED).json({
				error : 'Server error occured during login, please try again later!'
			});
		}
	},
	Update    : async (req, res) => {
		// updating the User by id
		try {
			//check if username ia already taken
			const userName = await User.findOne({ username: req.body.username });
			if (userName) {
				return res
					.status(StatusCodes.CONFLICT)
					.json({ error: 'Username already exists, Enter another Username' });
			}
			//check for the User
			const user = await User.findOneAndUpdate({ _id: req.params.userID }, { $set: req.body });
			return res.status(StatusCodes.OK).json({ message: 'User successfully updated!' });
		} catch (err) {
			//throw Error
			res.status(404).json({
				Error : 'Something Went Wrong >>> User of Given ID was Not Found'
			});
		}
	},
	ViewUsers : async (req, res) => {
		// viewing Users
		try {
			const users = await User.find();
			return res.status(StatusCodes.OK).json(users);
		} catch (err) {
			//throw error
			console.log('Error while fetching user account!', err);
			return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Something Went Wrong!' });
		}
	}
};
