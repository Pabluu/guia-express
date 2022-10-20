const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'pablo', '2107ph', {
    host: 'localhosst',
    dialect: 'mysql'
});

module.exports = connection;