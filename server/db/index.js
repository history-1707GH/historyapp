const db = require('./_db');

const User = require('./models/user');
const Route = require('./models/route');
const Experience = require('./models/experience');
const Wiki = require('./models/wiki');
const Nyt = require('./models/nyt');

Route.belongsTo(Experience)
Route.belongsTo(User)

Experience.belongsTo(Wiki)
Experience.belongsTo(Nyt)

module.exports = db;