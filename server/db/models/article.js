const Sequelize = require('sequelize');
const db = require('../_db');

const Article = db.define('article', {
    byline: { 
        type: Sequelize.JSONB
    },
    document_type: {
        type: Sequelize.STRING
    },
    headline: {
        type: Sequelize.JSONB
    },
    keywords: {
        type: Sequelize.JSONB
    }, 
    multimedia: {
        type: Sequelize.JSONB
    },
    new_desk: {
        type: Sequelize.STRING
    },
    pub_date: {
        type: Sequelize.STRING
    },
    score: {
        type: Sequelize.FLOAT
    },
    section_name: {
        type:Sequelize.STRING 
    },
    snippet: {
        type: Sequelize.TEXT
    },
    source: {
        type: Sequelize.STRING
    },
    type_of_material: {
        type: Sequelize.STRING
    },
    web_url: {
        type: Sequelize.STRING
    },
    source_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
})

module.exports = Article;