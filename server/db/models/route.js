const Sequelize = require('sequelize');
const db = require('../_db');
const User = db.models.user
const Experience = db.models.experience

const Route = db.define('route', {
}, {
    defaultScope: {
        include: [{model: User}]
    }
})

module.exports = Route;