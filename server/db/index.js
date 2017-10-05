const db = require('./_db');

const User = require('./models/user');
const Route = require('./models/route');
const Experience = require('./models/experience');
const Synopsis = require('./models/synopsis');
const Article = require('./models/article');

//Route is associated to many experiences; an individual experience can be a part of multiple routes
Route.belongsToMany(Experience)
//A route has a single user and a user can have multiple routes
Route.belongsTo(User)
User.hasMany(Routes)

//Experience is associated to multiple articles and single synopsis
Article.hasMany(Experience)
Experience.belongsTo(Synopsis)

module.exports = db;