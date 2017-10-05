'use strict'
const router = require('express').Router()
const db = require('../db')

const Experience = db.models.experience;



router.route('/:id')
    .post((req, res, next) => {
        Experience.findOrCreate({
            where: {
                lat: req.body.lat,
                lon: req.body.lon,
            }
        })
        .spread((experience, created)=>{
            res.status(201).json(experience)
        })
        .catch(next)
    })

module.exports = router;