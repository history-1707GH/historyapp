'use strict'
const router = require('express').Router()
const db = require('../db')

const User = db.models.user;

router.route('/')
    .get((req, res, next) => {
        User.findAll()
            .then(users => users.map(user => user.sanitize()))
            .then(users => {
                function sortByPoints(a,b){
                    return ((a.points < b.points ? 1 : a.points > b.points ? -1 : 0))
                }
                return users.sort(sortByPoints).slice(0,10)
            })
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    })

module.exports = router;