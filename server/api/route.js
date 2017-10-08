'use strict'
const router = require('express').Router()
const db = require('../db')

const Route = db.models.route;

router.route('/')
    .post((req,res,next)=>{
        
    })

module.exports = router;