const db = require('./_db');

const User = require('./models/user');
const Route = require('./models/route');
const Experience = require('./models/experience');
const Synopsis = require('./models/synopsis');
const Article = require('./models/article');
const Note = require('./models/note');

Route.belongsTo(Experience)
Route.belongsTo(User)

Experience.belongsTo(Article)
Experience.belongsTo(Synopsis)

Note.belongsTo(User)
Experience.belongsTo(Note)

module.exports = db;