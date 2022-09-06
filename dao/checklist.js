const db = require('../config/database');
const sequelize = require('sequelize');
const Question = require('./question');
const OptionValue = require('./optionvalue');

const Checklist = db.define(
	'Checklist',
	{
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: sequelize.STRING,
			allowNull: false,
		},
		createdBy: {
			type: sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: 'checklist',
	}
);

Checklist.hasMany(Question);
Question.belongsTo(Checklist);

Question.hasMany(OptionValue);
OptionValue.belongsTo(Question);

// db.sync().then((result) => console.log(result));
module.exports = Checklist;
