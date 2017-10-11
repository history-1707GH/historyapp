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
                $or: [{email: req.body.email},{username: req.body.username}]
            },
            defaults: {
                password: req.body.password,
                points: 0
            }
        })
            .spread((user, accountCreated) => {
                if (accountCreated) {req.login(user, error => {
                    if (error) {
                        next(error)
                    } else {
                        let u = user.sanitize()
                        res.json(u)
                    }
                })} else {
                    res.json({signupError: 'Username taken or user might already exist.'})
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
                if (!user) res.json({loginError:'Wrong email or password'});
                if (user && !user.correctPassword(req.body.password)) res.json({loginError:'Wrong email or password'});
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

module.exports = router;