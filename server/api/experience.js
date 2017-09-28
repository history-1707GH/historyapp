'use strict'
const router = require('express').Router()
const db = require('../db/db')

const Experience = db.models.experience;

router.route('/')
    .get((req, res, next) => {
        Experience.findAll()
            .then(experiences => {
                res.status(200).json(experiences)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Experience.create(req.body)
            .then(experience => {
                res.status(201).json(experience)
            })
            .catch(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        Experience.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(experience => {
                res.status(200).json(experience)
            })
            .catch(next)
    })
    .put((req, res, next) => {
        Experience.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(experience => {
                res.status(202).json(experience)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Experience.destroy({
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