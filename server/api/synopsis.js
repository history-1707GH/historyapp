'use strict'
const router = require('express').Router()
const db = require('../db')

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
        Synopsis.findOrCreate({
            where: {
                pageId: req.body.pageId
            }
        })
            .spread((synopsis, created) => {
                if (created) {
                    synopsis.update({
                        title: req.body.title,
                        content: req.body.content
                    })
                }
                return synopsis
            })
            .then(synopsis => res.status(201).json(synopsis))
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
            .then(() => {
                res.sendStatus(200)
            })
            .catch(next)
    })

module.exports = router;