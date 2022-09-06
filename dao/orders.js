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
});

Orders.hasOne(User, { foreignKey: 'createdBy' });
User.belongsTo(Orders);

Orders.hasOne(Checklist, { foreignKey: 'checklistId' });
Checklist.belongsTo(Orders);

// Orders.sync().then((data) => console.log(data));
module.exports = Orders;
