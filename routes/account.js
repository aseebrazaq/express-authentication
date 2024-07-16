const express = require('express')
const router =  express.Router()

const { isAuthorised } = require('../middleware/auth')
const { locals } = require('../utils/format')

router.get('/index', isAuthorised, (req, res) => {
    res.render('account/index', req.session?.user)
})

router.get('/list', isAuthorised, (req, res) => {
    res.render('account/list', req.session?.user)
})

router.get('/logout', isAuthorised, (req, res) => {
    req.session?.destroy()
    res.render('users/login', locals({}, 'Successfully logged out'))
})

module.exports = router