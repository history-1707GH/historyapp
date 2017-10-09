'use strict'
const router = require('express').Router()
const db = require('../db')
const Note = db.models.note;

router.route('/')
    .post((req, res, next) => {
        Note.create(req.body)
            .then(note => res.json(note))
            .catch(next);
    })


    

module.exports = router