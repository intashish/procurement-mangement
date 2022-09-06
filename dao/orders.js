const db = require('../config/database');
const sequelize = require('sequelize');
const User = require('./user');
const Checklist = require('./checklist');

const Orders = db.define('Orders', {
	id: {
		type: sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	description: {
		type: sequelize.STRING,
		allowNull: true,
	},
	createdBy: {
		type: sequelize.INTEGER,
		allowNull: false,
	},
	checklistId: {
		type: sequelize.INTEGER,
	},
	status: {
		type: sequelize.ENUM('completed', 'pending'),
		defaultValue: 'pending',
	},
});

Orders.hasOne(User, { foreignKey: 'createdBy' });
User.belongsTo(Orders);

Orders.hasOne(Checklist, { foreignKey: 'checklistId' });
Checklist.belongsTo(Orders);

module.exports = Orders;
