const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validatePost } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const main = require('../controllers/main')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({ accessToken: mapboxToken })


router.post('/create', isLoggedIn, upload.array('image'), validatePost, async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()

})
router.get('/create', isLoggedIn, (req, res) => {
    res.render('post/create')
})

module.exports = router