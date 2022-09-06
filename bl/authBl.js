const User = require('../dao/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

async function authentication(userDetails) {
	try {
		let user;
		if (userDetails.mobileNumber) {
			user = await User.findOne({
				where: {
					mobile: userDetails.mobileNumber,
				},
			});
		} else {
			user = await User.findOne({
				where: {
					email: userDetails.email,
				},
			});
		}

		if (!user) {
			return { status: 'error', message: 'User not found' };
		}

		const isPasswordcorrect = await bcrypt.compare(userDetails.password, user.password);
		if (!isPasswordcorrect) {
			return { status: 'error', message: 'Password incorrect' };
		}

		const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWTKEY);
		// const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWTKEY, { expiresIn: '120' });
		return { status: 'success', message: 'login success', token: token };
	} catch (err) {
		return { status: 'error', message: err.message };
	}
}

async function userRegister(userDetails) {
	//add validation as well
	const validation = Joi.object({
		name: Joi.string().min(3).max(20).required(),
		email: Joi.string()
			.email({ tlds: { allow: ['com', 'net'] } })
			.required(),
		mobile: Joi.string().length(10).required(),
		password: Joi.string().required(),
	});
	try {
		const verify = validation.validateAsync({
			name: userDetails.name,
			email: userDetails.email,
			mobile: userDetails.mobileNumber,
			password: userDetails.password,
		});
		let ifExist = await User.findOne({ where: { email: userDetails.email } });
		if (!ifExist) {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(userDetails.password, salt);
			const newUser = await User.create({
				name: userDetails.name,
				email: userDetails.email,
				mobile: userDetails.mobileNumber,

				role: userDetails.role,
				password: hash,
			});
		} else {
			return { status: 'success', message: 'User already exist.' };
		}
		return { status: 'success', message: 'user created successfully' };
	} catch (err) {
		console.log(err);
		return { status: 'error', message: err.message };
	}
}

module.exports = {
	authentication,
	userRegister,
};
