const db = require('../config/database');
const sequelize = require('sequelize');

const Question = db.define(
	'Question',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		question: {
			type: sequelize.STRING,
			allowNull: false,
		},
		optionType: {
			type: sequelize.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'question',
	}
);

module.exports = Question;
