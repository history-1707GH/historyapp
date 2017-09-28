const Sequelize = require('sequelize');
const db = require('../_db');

const Wiki = db.define('wiki', {
    url: { 
        type: Sequelize.STRING
    }
})

module.exports = Wiki;