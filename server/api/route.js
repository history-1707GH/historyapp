'use strict'
const router = require('express').Router()
const db = require('../db')
const Route = db.models.route;
const Experience = db.models.experience
const Synopsis = db.models.synopsis

router.route('/')
    .post((req, res, next) => {
        let handlingRoute
        if (req.body.routeId > 0) {
            const routeId = req.body.routeId
            handlingRoute = Route.findOne({
                where: {
                    id: routeId
                }
            })
        } else {
            handlingRoute = Route.create()
        }
        handlingRoute.then(route=> {
            return route.setUser(req.body.userId)
        })
        
        
        .then(route => {
            return route.addExperience(req.body.experience.id)
        })
            .then(association => {
                res.json(association[0][0].dataValues.routeId)
            })
            .catch(next)

    })

router.get('/:userId', (req, res, next) => {
    Route.findAll({
        where: {
            userId: req.params.userId
        }, include: [
            {model: Experience, include: [
                {model: Synopsis}
            ],   order: [ [ Route, Experience, 'createdAt' ] ]
        }
        ]})
        .then(routes => {
            res.json(routes)
        })
        .catch(next)
})


module.exports = router;