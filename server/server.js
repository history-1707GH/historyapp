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


//serving routes
app.use('/api', require('./api'));

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
<<<<<<< HEAD
    // then start listening with our express server once we have synced
    // return https.createServer({
    //     key: fs.readFileSync(path.join(__dirname, '../server.enc.key')),
    //     certificate: fs.readFileSync(path.join(__dirname, '../server.crt')),
    //     ciphers: ['RSA-AES128-GCM-SHA256', 
    //     'RSA-AES256-GCM-SHA384',
    //     'ECDHE-ECDSA-AES128-GCM-SHA256',
    //     'ECDHE-ECDSA-AES256-GCM-SHA384'].join(':'),
    // }, app).listen(port, ()=>{
    //   console.log('Initiating')
    // })
=======
>>>>>>> master
    return app.listen(port, function () {
      console.log(`Server Starting: ${port}`);
    })
  })
  .then(server => {
    const io = require('socket.io')(server);
    io.on('connection', function (socket) {
      console.log('connected')
      socket.on('buy-item', items => {
        console.log('buy-item')
        socket.broadcast.emit('buy-item', items)
      })
    })
  })