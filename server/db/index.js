const db = require('./_db');

const User = require('./models/user')
const Route = require('./models/route')
const Experience = require('./models/experience')
const Synopsis = require('./models/synopsis')
const Article = require('./models/article')
const Route_Experience = require('./models/route_experience')
const Note = require('./models/note')

//Route is associated to many experiences; an individual experience can be a part of multiple routes
Route.belongsToMany(Experience, {through: Route_Experience})
Experience.hasMany(Route)

//A route has a single user and a user can have multiple routes
Route.belongsTo(User)
User.hasMany(Route)

//Experience is associated to multiple articles and single synopsis
Experience.belongsToMany(Article, {through: 'Experience-Article'})
Experience.belongsTo(Synopsis, {targetKey: 'pageId'})

User.hasMany(Note)
Experience.hasMany(Note)

module.exports = db;