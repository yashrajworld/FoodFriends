if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}


//Required Packages
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const { userInfo } = require('os')
const MongoDBStore = require('connect-mongo')(session)


//Required Local Files
const ExpressError = require('./utils/ExpressError')
const User = require('./models/user')

//flash
app.use(flash())


const port = process.env.PORT || 3000
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/food-friends'
const secret = process.env.SECRET || 'thisshouldbeabettersecret'

mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, "Connection Error : "))
db.once('open', () => {
    console.log("Database Connected")
})


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

//security
app.use(helmet({ contentSecurityPolicy: false }))
const store = new MongoDBStore({
    url: dbUrl,
    secret: secret,
    touchAfter: 24 * 3600
})
store.on("error", function (e) {
    console.log('Session store error')
})

app.use(session({
    store: store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7)
    }
}))
//passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



//Setting up locals
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.user // currentUser will store info of the usr logged in globally!
    next()
})

//Setting up routes
const userRoutes = require('./routes/user')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/post')


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.use('/user', userRoutes)
app.use('/main', mainRoutes)
app.use('/post', postRoutes)


//Error handling
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) {
        err.message = "Oh No, Something went wrong"
    }
    res.status(statusCode).render('error', { err })
})

app.listen(port, () => {
    console.log('Serving on port ' + port)
})