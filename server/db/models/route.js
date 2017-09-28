const Sequelize = require('sequelize');
const db = require('../_db');

const Route = db.define('route', {
    previous: {
        type: Sequelize.INTEGER
    },
    next: {
        type: Sequelize.INTEGER
    }
})

module.exports = Route;