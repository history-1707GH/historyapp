const Sequelize = require('sequelize');
const db = require('../builder');

const Wiki = db.define('wiki', {
    url: { 
        type: Sequelize.STRING
    }
})

module.exports = Wiki;