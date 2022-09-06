const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const user = sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	role: {
		type: Sequelize.ENUM('ADMIN', 'PM', 'IM'),
	},
	assignedTo: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

// user.sync().then((data) => console.log(data));
module.exports = user;
