const express = require('express')
const router = express.Router()

const { isAuthorised } = require('../middleware/auth')
const { locals } = require('../utils/format')

router.get('/index', isAuthorised, (req, res) => {
    const payload = {
        ...req.session?.user,
        authorised: req.session?.authorised,
    }
    console.log('ppp', payload)
    res.render('account/index', locals(payload))
})

router.get('/list', isAuthorised, (req, res) => {
    const payload = {
        ...req.session?.user,
        authorised: req.session?.authorised,
    }
    res.render('account/list', locals(payload))
})

router.get('/logout', isAuthorised, (req, res) => {
    req.session?.destroy()
    res.render('users/login', locals({}, 'Successfully logged out'))
})

module.exports = router
