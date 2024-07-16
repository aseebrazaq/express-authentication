const express = require('express')
const router =  express.Router()

const { User } = require('../models/user')
const { hashPassword, comparePassword } = require('../utils/encryption')
const { bypassIfAuthorised } = require('../middleware/auth')
const { locals } = require('../utils/format')

router.use(bypassIfAuthorised)

// keep static route at top
router.get('/register', (req, res) => {
    res.render('users/register', locals({firstName: 'placeholder'}))
})

router.get('/login', (req, res) => {
    res.render('users/login')
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
                res.redirect('/account/index')
                return
            } else {
                res.render('users/login', locals({ email }, 'Forgot password?'))
                return
            }
    } catch (error) {
        res.render('users/login', locals({ email }, error))
    }
      
})

router.post('/register', async (req, res) => {
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
        res.status(500).render('users/register', locals(payload, errMessage));
    }
})

module.exports = router