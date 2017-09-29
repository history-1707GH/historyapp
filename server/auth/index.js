const router = require('express').Router();
const db = require('../db')
const User = db.models.user;

//get user if logged in
router.get('/me', (req, res, next) => {
    if (req.user){
        res.json(req.user.sanitize())
    } else {
        res.json({})
    }
})

//signup
router.post('/signup', (req, res, next) => {
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
})

//login
router.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
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
        .catch(next)
})

//logout
router.delete('/logout', (req, res, next) => {
    req.logout();
    res.sendStatus(204);
});

// //Google Login
// router.use('/google', require('./google'))
// ^this is causing errors so let's debug it later...

module.exports = router;