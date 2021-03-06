const fs = require('fs');
const https = require('https');
const express = require('express');
const session = require('express-session');
const app = express();

const path = require('path');

const passport = require('passport');

const db = require('./db');
const User = db.models.user;

// general purpose middleware
app.use(require('./middleware/general'))

//static
app.use(express.static(path.join(__dirname, '../public')));

//db store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();

//session&passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'fluffykins the doggy',
  store: dbStore,
  resave: false,
  saveUninitialized: true
}));

app.use(require('./middleware/passport'));

//serving routes
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

//errorhandling
app.use(require('./middleware/error'))

// serve index.html for all non-api routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// process.env.PORT for deploying to Heroku or 3000 for local
const port = process.env.PORT || 3000;

// sync our database
db.sync()
  .then(function () {
    return app.listen(port, function () {
      console.log(`Server Starting: ${port}`);
    })
  })
  .catch(console.error);