'use strict'
const router = require('express').Router()
const db = require('../db')
const Note = db.models.note;

router.route('/')
    .get((req, res, next) => {
        Note.findAll()
            .then(notes => {
                res.json(notes)
            })
            .catch(next)
    })
    .post((req, res, next) => {
        Note.create(req.body)
            .then(note => res.json(note))
            .catch(next);
    })

router.route('/:experence')
    .get((req, res, next) => {
        Note.findAll({
            where: {
              productId: req.params.productId
            }
          })
          .then(reviews => res.json(reviews))
          .catch(next);
    })
    

module.exports = router;