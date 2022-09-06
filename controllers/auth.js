const auth = require('../bl/authBl');
const bcrypt = require('bcryptjs');
// const createError = require('../utils/error');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
	let newUserDetails = {
		name: req.body.name,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		role: req.body.role,
		password: req.body.password,
	};

	let response = await auth.userRegister(newUserDetails);

	if (response.status == 'error') {
		res.status(401).json(response);
	} else {
		res.status(200).json(response);
	}
};

const login = async (req, res, next) => {
	let userDetails = {};

	if (req.query.mobileNumber) {
		userDetails = {
			mobileNumber: req.query.mobileNumber,
			password: req.query.password,
		};
	} else {
		userDetails = {
			email: req.query.email,
			password: req.query.password,
		};
	}

	const response = await auth.authentication(userDetails);
	console.log(response);
	if (response.status == 'error') {
		res.status(401).json(response);
	} else {
		res.status(200).json(response);
	}
};

const userCreation = async (req, res, next) => {
	const role = req.userDetails.role;
	console.log(req.body);

	let newUserDetails = {
		name: req.body.name,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		role: req.body.role,
		password: req.body.password,
	};

	let response = await auth.createUserBl(role, newUserDetails);

	if (response.status == 'error') {
		res.status(401).json(response);
	} else {
		res.status(200).json(response);
	}
};

module.exports = { register, login, userCreation };
