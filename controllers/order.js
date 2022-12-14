const orderBl = require('../bl/orderBl');

//@desc      Get all order
//@route     GET /api/order
exports.getAllOrder = async (req, res) => {
	let response = await orderBl.getAllOrder();

	if (response.status == 'success') {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
};

//@desc      Get order details
//@route     GET /api/order/:id
exports.getOrder = async (req, res) => {
	let orderId = req.params.id;
	let response = await orderBl.getOrder(userType, orderId);

	if (response.status == 'success') {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
};

//@desc      Update order details
//@route     PUT /api/order/:id
exports.updateOrder = async (req, res) => {
	const userType = req.userDetails.role;
	let orderId = req.params.id;
	let response = await orderBl.updateOrder(userType, orderId);

	if (response.status == 'success') {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
};

//@desc      Create order
//@route     POST /api/order
exports.createOrder = async (req, res) => {
	const user = {
		type: req.userDetails.role,
		id: req.userDetails.id,
	};

	let ordersDetail = {
		description: req.body.description,
		checklistId: req.body.checklistId,
	};
	let response = await orderBl.createOrder(user, ordersDetail);

	if (response.status == 'success') {
		res.status(200).json(response);
	} else {
		res.status(400).json(response);
	}
};
