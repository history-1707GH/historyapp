'use strict'
const router = require('express').Router()
const db = require('../db')

const User = db.models.user;

router.route('/')
  .put((req,res,next)=>{
    User.findOne({
      where: {
        id: req.body.userId
      }
    })
    .then(user => {
      return user.points+req.body.points
    })
    .then(points =>{
      return User.update({points: points}, {
        where: {
          id: req.body.userId
        }
      })
    })
    .then(()=>{
      return User.findOne({
        where: {
          id: req.body.userId
        }
      })
    })
    .then(user => user.sanitize())
    .then(user => res.json(user))
  })

module.exports = router;