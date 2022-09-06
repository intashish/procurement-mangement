const db = require('../config/database');
const sequelize = require('sequelize');

const OptionValue = db.define(
	'OptionValue',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		value: {
			type: sequelize.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'optionValue',
	}
);

module.exports = OptionValue;
