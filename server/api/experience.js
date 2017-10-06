'use strict'
const router = require('express').Router()
const db = require('../db')

const Experience = db.models.experience;
const Synopsis = db.models.synopsis



router.route('/')
    .post((req, res, next) => {
        Experience.findOne({
            where: {  //how to validate on associations
                lat: req.body.lat,
                lon: req.body.lon,
                synopsisId: req.body.wikiPageId
            }
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
                                return experience.setArticles(req.body.headlines)
                            } else return experience 
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

module.exports = router; 