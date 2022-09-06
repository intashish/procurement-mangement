const Sequelize = require('sequelize');

const sequelize = new Sequelize('seqdb', 'root', '', {
	dialect: 'mysql',
	host: 'localhost',
});

module.exports = sequelize;
