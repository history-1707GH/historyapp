'use strict'
const router = require('express').Router()
const db = require('../db/db')

const Route = db.models.route;

router.route('/')
    .get((req,res,next)=>{
        Route.findAll()
            .then(routes => {
                res.status(200).json(routes)
            })
            .catch(next)
    })
    .post((req,res,next)=>{
        Route.create(req.body)
            .then(route => {
                res.status(201).json(route)
            })
            .catch(next)
    })

router.route('/:id')
    .get((req,res,next)=>{
        Route.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(route => {
                res.status(200).json(route)
            })
            .catch(next)
    })
    .put((req,res,next)=>{
        Route.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then(route => {
                res.status(202).json(route)
            })
            .catch(next)
    })
    .delete((req,res,next)=>{
        Route.destroy({
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