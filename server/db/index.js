const db = require('./_db');

const User = require('./models/user');
const Route = require('./models/route');
const Experience = require('./models/experience');
const Synopsis = require('./models/synopsis');
const Article = require('./models/article');
const Note = require('./models/note');

//Route is associated to many experiences; an individual experience can be a part of multiple routes
Route.belongsToMany(Experience, {through: 'Route-Experience'})
//A route has a single user and a user can have multiple routes
Route.belongsTo(User)
User.hasMany(Route)

//Experience is associated to multiple articles and single synopsis
Experience.belongsToMany(Article, {through: 'Experience-Article'})
Experience.belongsTo(Synopsis, {targetKey: 'pageId'})

Note.belongsTo(User)
Note.belongsTo(Experience)

module.exports = db;