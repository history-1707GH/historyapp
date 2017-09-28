const Sequelize = require('sequelize');
const db = require('../_db');

const Article = db.define('article', {
    url: { 
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
})

module.exports = Article;