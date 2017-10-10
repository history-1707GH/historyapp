const router = require('express').Router();
const db = require('../db')
const User = db.models.user;

router.route('/')
    .get((req, res, next) => {              //get user
        if (req.user) {
            res.json(req.user.sanitize())
        } else {
            res.json({})
        }
    })
    .post((req, res, next) => {           // create user
        User.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                password: req.body.password,
                username: req.body.username,
                points: 0
            }
        })
            .spread((user, notExist) => {
                if (notExist) {req.login(user, error => {
                    if (error) {
                        next(error)
                    } else {
                        let u = user.sanitize()
                        res.json(u)
                    }
                })} else {
                    res.json({signupError: 'Failed to create account. User might already exist.'})
                }
            })
            .catch(next)
    })
    //login
    .put((req, res, next) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (!user) res.json({loginError:'Failed to log in. Wrong email or password'});
                if (user && !user.correctPassword(req.body.password)) res.json({loginError:'Failed to log in. Wrong email or password'});
                if (user && user.correctPassword(req.body.password)) req.login(user, error => {
                    if (error) {
                        next(error)
                    } else {
                        let u = user.sanitize()
                        res.json(u)
                    }
                })
            })
    })

    .delete((req, res, next) => {
        req.logout();
        res.sendStatus(204);
    })

router.route('/checkUsername')
    .put((req,res,next)=>{
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (user) {
                res.status(200).json({userAvailability: 'Username not available'})
            } else {
                res.status(200).json({userAvailability: 'Username available'})
            }
                       
        })
    })

module.exports = router;