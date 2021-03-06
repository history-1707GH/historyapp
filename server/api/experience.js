
'use strict'
const router = require('express').Router()
const db = require('../db')

const Experience = db.models.experience;
const Synopsis = db.models.synopsis
const Article = db.models.article
const Note = db.models.note



router.route('/')
    .post((req, res, next) => {
        Experience.findOne({
            where: {  
                lat: req.body.lat,
                lon: req.body.lon,
                synopsisId: req.body.wikiPageId
            }, 
            include: [ 
                {model: Synopsis},
                {model: Article},
                {model: Note}
            ]
        })
            .then(experience => {
                if (!experience) {
                    return Experience.create({
                        lat: req.body.lat,
                        lon: req.body.lon
                    })
                        .then(experience => {
                            return experience.setSynopsis(req.body.wikiPageId)
                        })
                        .then(experience => {
                            if (req.body.headlines.length) {
                                const articleIds = req.body.headlines.map(article => {
                                    return article._id
                                })
                                return experience.setArticles(articleIds)
                                    .then(association => {
                                        return Experience.findOne({
                                            where: {
                                                id: association[0][0].dataValues.experienceId
                                            }, 
                                            include: [
                                                {model: Synopsis},
                                                {model: Article},
                                                {model: Note}
                                            ]
                                        })
                                    })
                            }
                            else {
                                return Experience.findOne({
                                    where: {
                                        id: experience.id
                                    }, 
                                    include: [
                                        {model: Synopsis},
                                        {model: Article},
                                        {model: Note}
                                    ]
                                })
                            }       
                        })

                } else {
                    return experience
                }
            })
            .then(experience => {
                res.status(201).json(experience)
            })
            .catch(next)
    })

router.route('/:userId')
    .get((req, res, next)=> {
        return Experience.findOne({
            where: {
                id: req.params.userId
            }, 
            include: [
                {model: Synopsis},
                {model: Article},
                {model: Note}
            ]
        })
        .then(experience=>res.json(experience))
    })

module.exports = router; 