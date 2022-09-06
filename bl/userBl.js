const bcrypt = require('bcryptjs');
const user = require('../dao/user');
const { Op } = require('sequelize');

async function createUserBl(role, newUserDetails) {
	//add created by 'self'/ 'userId'
	//already user exist or not
	//all validation remains
	if (role == 'IM') {
		return { status: 'error', message: 'You are not authorized to create user' };
	}
	if (role == 'PM' && newUserDetails.role != 'IM') {
		return { status: 'error', message: 'You are not authorized to create another PM' };
	}
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(newUserDetails.password, salt);
	try {
		const newUser = await User.create({ name: newUserDetails.name, email: newUserDetails.email, mobile: newUserDetails.mobileNumber, role: newUserDetails.role, password: hash });

		return { status: 'success', message: 'user created successfully' };
	} catch (error) {
		return { status: 'error', message: error.message };
	}
}

async function getAllUser(userType) {
	if (userType != 'ADMIN' && userType != 'PM') {
		return { status: 'error', message: 'you are not authorized' };
	}
	try {
		let result;
		if (userType == 'ADMIN') {
			result = await user.findAll({
				where: {
					role: { [Op.not]: 'ADMIN' },
				},
				attributes: ['name', 'email', 'mobile', 'role', 'assignedTo'],
			});
		}
		if (userType == 'PM') {
			result = await user.findAll({
				where: {
					role: 'IM',
				},
				attributes: ['name', 'email', 'mobile', 'role', 'assignedTo'],
			});
		}
		if (result) {
			return { status: 'success', data: result };
		} else {
			return { status: 'success', message: 'No data found' };
		}
	} catch (error) {
		return { status: 'error', message: error.message };
	}
}

async function getUser(userType, userId) {
	if (userType != 'ADMIN' && userType != 'PM') {
		return { status: 'error', message: 'You are not authorized' };
	}
	try {
		let result;
		if (userType == 'ADMIN') {
			result = await user.findByPk(userId, {
				attributes: ['name', 'email', 'mobile', 'role'],
			});
		}
		if (userType == 'PM') {
			result = await user.findOne({
				where: {
					id: userId,
					role: 'IM',
				},
				attributes: ['name', 'email', 'mobile', 'role'],
			});
		}
		if (result) {
			return { status: 'success', data: result };
		} else {
			return { status: 'success', message: 'No data found' };
		}
	} catch (error) {
		return { status: 'error', message: error.message };
	}
}

async function updateUser(userId, userDetails) {
	try {
		let result = await user.update(userDetails, {
			where: {
				id: userId,
			},
		});

		return { status: 'success', message: 'user updated' };
	} catch (error) {
		return { status: 'failed', message: error.message };
	}
}

async function deleteUser(userType, deleteUserId) {
	if (userType == 'IM') {
		return { status: 'error', message: 'You are not authorized to delete user' };
	}
	let result = await user.findAll({
		where: {
			id: deleteUserId,
		},
	});

	console.log(result);
	return { status: 'success', message: 'user created successfully' };
	// if (userType == 'PM' && result.) {
	// 	let role = 'IM';
	// }
}

module.exports = {
	createUserBl,
	updateUser,
	deleteUser,
	getAllUser,
	getUser,
};
