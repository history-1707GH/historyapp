const db = require('./_db');

const User = require('./models/user');
const Route = require('./models/route');
const Experience = require('./models/experience');
const Synopsis = require('./models/synopsis');
const Article = require('./models/article');

Route.belongsTo(Experience)
Route.belongsTo(User)

Experience.belongsTo(Article)

module.exports = db;