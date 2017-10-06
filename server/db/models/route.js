const Sequelize = require('sequelize');
const db = require('../_db');

const Route = db.define('route', {
    startTime: {
        type: Sequelize.TIME
    },
    endTime: {
        type: Sequelize.TIME
    }
})

module.exports = Route;