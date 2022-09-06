const userBl = require('../bl/userBl');

//@desc      Get all user details
//@route     GET /api/user/:id
exports.getUser = async (req, res) => {
	const userType = req.userDetails.role;
	let userId = req.params.id;
	let response = await userBl.getUser(userType, userId);

	if (response.status == 'success') {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
};

//@desc      Get all user details
//@route     GET /api/user
exports.getAllUser = async (req, res) => {
	const UserType = req.userDetails.role;
	let response = await userBl.getAllUser(UserType);

	if (response.status == 'success') {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
};

//@desc      update user details
//@route     PUT /api/user/:id
exports.updateUser = async (req, res) => {
	let userDetails = req.body;
	let userId = req.params.id;
	let response = await userBl.updateUser(userId, userDetails);
	if (response.status == ' success') {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
};

//@desc      delete user details
//@route     DELETE /api/user/:id
exports.deleteUser = async (req, res) => {
	const UserType = req.userDetails.role;
	let deleteUserId = req.params.id;
	let response = await userBl.deleteUser(UserType, deleteUserId);

	if (response.status == 'success') {
		res.status(200).json({
			status: 'success',
			message: `User ${deleteUserId} removed successfully`,
		});
	} else {
		res.status(404).json({
			status: 'failed',
			message: 'something went wrong. Try again',
		});
	}
};

//@desc      Create user details
//@route     POST /api/user
exports.createUser = async (req, res) => {
	const UserType = req.userDetails.role;
	let newUserDetails = {
		name: req.body.name,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		role: req.body.role,
		password: req.body.password,
	};

	let response = await userBl.createUserBl(UserType, newUserDetails);
	if (response.status == 'error') {
		res.status(401).json(response);
	} else {
		res.status(200).json(response);
	}
};
