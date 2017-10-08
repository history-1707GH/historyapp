const Sequelize = require('sequelize');
const db = require('../_db');
const Synopsis = db.models.synopsis
const Article = db.models.artcle

const Experience = db.define('experience', {
    lat: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    lon: {
        type: Sequelize.FLOAT,
        allowNull: false
    } 
})

module.exports = Experience;