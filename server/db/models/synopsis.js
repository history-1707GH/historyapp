const Sequelize = require('sequelize');
const db = require('../_db');

const Synopsis = db.define('synopsis', {
    url: { 
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
})

module.exports = Wiki;