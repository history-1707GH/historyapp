const Sequelize = require('sequelize');
const db = require('../_db');
const User = require('./user');

const Note = db.define('note', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
      len: [1, 500]
    }
  },
    author: {
      type: Sequelize.STRING
    }
  });

module.exports = Note;