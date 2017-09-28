const Sequelize = require('sequelize');
const db = require('../builder');

const Nyt = db.define('nyt', {
    url: { 
        type: Sequelize.STRING
    }
})

module.exports = Nyt;