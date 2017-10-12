const router = require('express').Router();
const db = require('../db')
const User = db.models.user;

router.route('/')
  .put((req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (user) {
          res.json({ updateError: 'Username already taken.' })
        } else {
          User.update({ username: req.body.username }, {
            where: {
              id: req.body.userId
            }
          })
            .then(() => {
              return User.findOne({
                where: {
                  id: req.body.userId
                }
              })
            })
            .then(user => user.sanitize())
            .then(user => res.json(user))
        }
      })
  })

module.exports = router;