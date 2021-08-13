const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const main = require('../controllers/main')

router.get('/home', (req, res) => {
    res.render("main/home")
})

module.exports = router