const protectedRoutes = [
    '/users/index'
]

const isAuthorised = (req, res, next) => {
    console.log(req.originalUrl)
    if (!req.session.authorised && protectedRoutes.includes(req.originalUrl)) {
        console.log('not authorised');
        res.render('users/login', {
            message: 'Unauthorised user please log in'
        })
        return
    } else if (req.session.authorised) {
        console.log('authorised');
    }
    next()
}

module.exports = {
    isAuthorised
}