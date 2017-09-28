'use strict'
const router = require('express').Router()
const db = require('../db/db')

const Nyt = db.models.nyt;

router.route('/')
    .get((req, res, next) => {
        Nyt.findAll()
            .then(nytInfos => {
                res.status(200).json(nytInfos)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Nyt.create(req.body)
            .then(nytInfo => {
                res.status(201).json(nytInfo)
            })
            .catch(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        Nyt.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(nytInfo => {
                res.status(200).json(nytInfo)
            })
            .catch(next)
    })
    .put((req, res, next) => {
        Nyt.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(nytInfo => {
                res.status(202).json(nytInfo)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Nyt.destroy({
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