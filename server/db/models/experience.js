const Sequelize = require('sequelize');
const db = require('../builder');

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