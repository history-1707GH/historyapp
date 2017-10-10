'use strict'
const router = require('express').Router()
const db = require('../db')

const User = db.models.user;

router.route('/')
    .get((req, res, next) => {
        User.findAll()
        .then(users=>users.map(user=>user.sanitize()))
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    })

module.exports = router;