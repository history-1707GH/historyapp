const Sequelize = require('sequelize');
const db = require('../_db');

const Nyt = db.define('nyt', {
    url: { 
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
})

module.exports = Nyt;