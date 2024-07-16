const protectedRoutes = [
    '/account/index',
    '/account/list'
]

const isAuthorised = (req, res, next) => {
    console.log('isAuth', req.originalUrl)

    if (!req.session.authorised && protectedRoutes.includes(req.originalUrl)) {
        console.log('not authorised');
        res.render('users/login', {
            message: 'Unauthorised user please log in'
        })
        return
    }
    next()
}

const bypassIfAuthorised = (req, res, next) => {
    console.log('bypass', req.originalUrl);
    if (req.session.authorised) {
        console.log('authorised - landed on login/register');
        res.render('account/index')
        return
    }
    next()
}

module.exports = {
    isAuthorised,
    bypassIfAuthorised
}