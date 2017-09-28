'use strict'
const router = require('express').Router()
const db = require('../db/db')

const Synopsis = db.models.synopsis;

router.route('/')
    .get((req, res, next) => {
        Synopsis.findAll()
            .then(synopsisInfos => {
                res.status(200).json(synopsisInfos)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Synopsis.create(req.body)
            .then(synopsisInfo => {
                res.status(201).json(synopsisInfo)
            })
            .catch(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        Synopsis.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(synopsisInfo => {
                res.status(200).json(synopsisInfo)
            })
            .catch(next)
    })
    .put((req, res, next) => {
        Synopsis.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(synopsisInfo => {
                res.status(202).json(synopsisInfo)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Synopsis.destroy({
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