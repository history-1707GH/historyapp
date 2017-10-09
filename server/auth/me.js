const router = require('express').Router()
const db = require('../db')
const User = db.models.user
const Note = db.models.note 

router.route('/')
    .get((req, res, next) => {              //get user
        if (req.user) {
            user.findOne({
                where: {
                    id: req.user.id
                },
                include: [  //IF THIS COMMENT IS STILL HERE, REJECT PR AND TELL ME TO PUT IN A DEFAULT SCOPE HELP TICKET!
                    { model: Synopsis },
                    { model: Note}
                ]
            })
            
            
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
            .spread((user, exist) => {
                if (exist) req.login(user, error => {
                    if (error) {
                        next(error)
                    } else {
                        let u = user.sanitize()
                        res.json(u)
                    }
                });
                if (!exist) res.status(401).send('User exists. Please log in.')
            })
            .catch(next)
    })
    //login
    .put((req, res, next) => {
        User.findOne({
            where: {
                email: req.body.email
            },
            include: [  //IF THIS COMMENT IS STILL HERE, REJECT PR AND TELL ME TO PUT IN A DEFAULT SCOPE HELP TICKET!
                { model: Synopsis },
                { model: Note}
            ]
        })
            .then(user => {
                if (!user) res.status(401).send('Wrong email or password');
                if (user && !user.correctPassword(req.body.password)) res.status(401).send('Wrong email or password');
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