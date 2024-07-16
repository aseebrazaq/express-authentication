const express = require('express')
const session = require('express-session')
const ejs = require('ejs')
const userRouter = require('./routes/users')
const accountRouter = require('./routes/account')

const { sequelize, testConnection } = require('./lib/db')

const app = express()

app.set('view engine', 'ejs')
// required for forms
app.use(express.urlencoded({extended: true}))
// for JSON request
app.use(express.json())
// middleware for sessions
//sid.signature
app.use(session({
    secret: 'anytexthere',
    cookie: {
        sameSite: 'strict',
        maxAge: 30000
    },
    saveUninitialized: false
}))
app.use(express.static(__dirname + '/public'));

// STATIC example (/test/tt.html) navigate all pages in directory
// app.use(express.static("public"))

// add use logger to add middleware to every route
// app.use(logger)

// get/post/put/delete/patch, tend not to use next param on get post, can have as many middlewares as needed
// app.get("/", logger, logger, (req, res))...
app.get('/', (req, res) => {
    // console.log('here')
    // res.sendStatus(500)
    // res.status(200).send('HI')
    // res.status(200).json({message: 'error'})
    // res.download('server.js')
    // res.json({message: 'error'})
    res.render('index', { text: 'world'})
})

// link route to path
app.use('/users', userRouter)
app.use('/account', accountRouter)

sequelize.sync().then(()=>{
    testConnection()
    console.log('db is ready')
    app.listen(3000)
})