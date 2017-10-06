const Sequelize = require('sequelize');
const db = require('../_db');

const Synopsis = db.define('synopsis', {
    pageId: { 
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    }
})

module.exports = Synopsis;