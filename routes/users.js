const express = require('express')
const router =  express.Router()

router.use(logger)

const { User } = require('../utils/connect')

router.get('/', (req, res) => {
    // reading specific param ?name=...
    console.log(req.query.name);
    res.send('user list')
})

// keep static route at top
router.get('/new', (req, res) => {
    // res.send('user new form')
    res.render('users/new', {firstName: 'placeholder'})
})

// cannot access the body, need to use middleware express.urlencoded
router.post('/', (req, res) => {
    const isValid = true;
    if(isValid) {
        users.push({firstName: req.body.firstName})
        res.redirect(`/users/${users.length - 1}`)
    } else {
        // false redirects with param passed back
        console.log('error')
        res.render('users/new', { firstName: req.body.firstName })
    }
    console.log( req.body.firstName )
    res.send('create user, Hello')
})

router.post('/validate', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.send('user is added')
        console.log(newUser.toJSON()); // This is good!
        //console.log(JSON.stringify(newUser, null, 4)); // This is also good!
    } catch (error) {
        console.error('Unable to CREATE USER:', error);
    }
    
    // res.send('testing connection on validate')
})

// order important reads top to bottom
// static first, dynamic last, example url /users/1
router.route('/:id').get((req, res) => {
    console.log(req.user)
    res.send(`get user with id ${req.params.id}`)
}).put((req, res) => {
    res.send(`put user with id ${req.params.id}`)
}).delete((req, res) => {
    res.send(`delete user with id ${req.params.id}`)
})

const users = [{ name: 'kyle'}, {name: 'sally'}]
// when any route had id runs / param is a type of middleware runs before get put delete
// runs before res.send()
router.param('id', (req, res, next, id) => {
    req.user = users[id]
    next()
})

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

module.exports = router