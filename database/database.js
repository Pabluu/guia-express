const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'pablo', '2107ph', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;