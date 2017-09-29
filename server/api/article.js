'use strict'
const router = require('express').Router()
const db = require('../db')
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
        let headlines = req.body;
        Promise.all(headlines.map(headline => {
            headline.source_id = headline._id
            return Article.create(headline)
        }))
        .catch(next);
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