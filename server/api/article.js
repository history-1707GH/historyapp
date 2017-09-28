'use strict'
const router = require('express').Router()
const db = require('../db/db')

const Article = db.models.article;

router.route('/')
    .get((req, res, next) => {
        Article.findAll()
            .then(articleInfos => {
                res.status(200).json(articleInfos)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Article.create(req.body)
            .then(articleInfo => {
                res.status(201).json(articleInfo)
            })
            .catch(next)
    })

router.route('/:id')
    .get((req, res, next) => {
        Article.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(articleInfo => {
                res.status(200).json(articleInfo)
            })
            .catch(next)
    })
    .put((req, res, next) => {
        Article.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(articleInfo => {
                res.status(202).json(articleInfo)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        Article.destroy({
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