'use strict'
const router = require('express').Router()
const db = require('../db')

const User = db.models.user;

router.route('/')
    .get((req, res, next) => {
        User.findAll()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        User.create(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    })
    .put((req, res, next) => {
        User.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(user => {
                res.status(202).json(user)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(()=> {
            res.sendStatus(200)
        })
        .catch(next)
    })

module.exports = router;