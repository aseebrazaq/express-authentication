const express = require('express')
const router =  express.Router()

const { User } = require('../models/user')
const { hashPassword, comparePassword } = require('../utils/encryption')
const { isAuthorised } = require('../middleware/auth')
const { locals } = require('../utils/format')

router.use(isAuthorised)

router.get('/', (req, res) => {
    // reading specific param ?name=...
    console.log(req.query.name);
    res.send('user list')
})

// keep static route at top
router.get('/new', (req, res) => {
    res.render('users/new', locals({firstName: 'placeholder'}))
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.get('/index', (req, res) => {
    res.render('users/dashboard')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const dbUser = await User.findAll({
            where: {
              email: email
            },
          });
          if (!dbUser[0]?.dataValues) {
            res.render('users/login', locals({ email }, 'Incorrect email or password'))
            return
          }

            const { password: dbPassword } = dbUser[0]?.dataValues;
            const match = await comparePassword(password, dbPassword);
            console.log('match', match);

            if (match) {
                    console.log(req.sessionID);
                    req.session.authorised = true;
                    req.session.user = dbUser[0]?.dataValues;
                    console.log(dbUser[0]?.dataValues);
                res.redirect('/users/index')
                return
            } else {
                res.render('users/login', locals({ email }, 'Forgot password?'))
                return
            }
    } catch (error) {
        res.render('users/login', locals({ email }, error))
    }
      
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

router.post('/new', async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    const hashed = await hashPassword(password)
    const payload = {
        ...req.body,
        password: hashed
    }
    try {
        const newUser = await User.create(payload)
        console.log(newUser.toJSON()); // This is good!
        res.status(201).render('users/login', locals({}, 'User created successfully, Please log in.'));
        //console.log(JSON.stringify(newUser, null, 4)); // This is also good!
        // res.send('user is added')
    } catch (error) {
        console.error('Unable to CREATE USER:', error?.errors[0]?.message);
        const errMessage = error?.errors[0]?.message || 'Failed to create user, Try again.';
        res.status(500).render('users/new', locals(payload, errMessage));
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

module.exports = router