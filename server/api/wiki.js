'use strict'
const router = require('express').Router()
const db = require('../db/db')

const Wiki = db.models.wiki;

router.route('/')
    .get((req, res, next) => {
        Wiki.findAll()
            .then(wikiInfos => {
                res.status(200).json(wikiInfos)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Wiki.create(req.body)
            .then(wikiInfo => {
                res.status(201).json(wikiInfo)
            })
            .catch(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        Wiki.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(wikiInfo => {
                res.status(200).json(wikiInfo)
            })
            .catch(next)
    })
    .put((req, res, next) => {
        Wiki.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(wikiInfo => {
                res.status(202).json(wikiInfo)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Wiki.destroy({
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