const express = require('express')
const app = express()

app.set('view engine', 'ejs')
// required for forms
app.use(express.urlencoded({extended: true}))
// for JSON request
app.use(express.json())

// STATIC example (/test/tt.html) navigate all pages in directory
// app.use(express.static("public"))

// add use logger to add middleware to every route
// app.use(logger)

// get/post/put/delete/patch, tend not to use next param on get post, can have as many middlewares as needed
// app.get("/", logger, logger, (req, res))...
app.get('/', logger, (req, res) => {
    // console.log('here')
    // res.sendStatus(500)
    // res.status(200).send('HI')
    // res.status(200).json({message: 'error'})
    // res.download('server.js')
    // res.json({message: 'error'})
    res.render('index', { text: 'world'})
})

const userRouter = require('./routes/users')

// link route to path
app.use('/users', userRouter)

// all middleware takes req res next
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(3000)