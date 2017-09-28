const Sequelize = require('sequelize');
const db = require('../_db');

const Experience = db.define('route', {
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = Experience;