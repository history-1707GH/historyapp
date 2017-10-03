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
            // OB/FF: could use `findOrCreate`
            return Article.findOne({
                where: {
                    source_id: headline._id
                }
            })
            .then(article =>{
                if (!article) {
                    return Article.create(headline);
                } 
            })
            // OB/FF: not sending response for this request, consider 204
            .catch(next); // OB/FF: don't need this .catch given the one below
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
                // OB/FF: might as well be 200, 202 means something different
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
            res.sendStatus(200) // OB/FF: could be 204
        })
        .catch(next)
    })

module.exports = router;