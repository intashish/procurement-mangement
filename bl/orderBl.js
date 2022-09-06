const Orders = require('../dao/orders');
const colors = require('colors');
async function getAllOrder() {
	try {
		const result = await Orders.findAll();
		console.log(result.green);
		if (result) {
			return { status: 'success', message: 'Data found', data: result };
		} else {
			return { status: 'success', message: 'No ata found', data: {} };
		}
	} catch (error) {
		return { status: 'error', message: error.message };
	}
}

async function getOrder(id) {
	try {
		const result = await Orders.findByPk(id);
		if (result) {
			return { status: 'success', message: 'Data found', data: result };
		} else {
			return { status: 'success', message: 'No data found', data: {} };
		}
	} catch (error) {
		return { status: 'error', message: error.message };
	}
}

async function createOrder(user, ordersDetail) {
	if (user.type != 'PM') {
		return { status: 'success', message: 'You are not authorized to create order', data: {} };
	}
	try {
		const result = await Orders.create({
			description: ordersDetail.description,
			createdBy: user.id,
			checklistId: ordersDetail.checklistId,
		});
		if (result) {
			return { status: 'success', message: 'Order created successfully' };
		}
	} catch (error) {
		return { status: 'failed', message: error.message };
	}
}

module.exports = { createOrder, getAllOrder, getOrder };
