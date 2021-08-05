const mongoose = require('mongoose')
const PhotoSchema = require('./image')
const opts = { toJSON: { virtuals: true } }
const InformationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    photos: [PhotoSchema],
    countInvited: {
        type: number,
        default: 0
    },
    countWent: {
        type: number,
        default: 0
    },
    bio: {
        type: String
    },
    city: {
        type: String.bind,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    opts
})
InformationSchema.virtual('properties.rating').get(function () {
    let sum = 0
    let count = 0
    for (let review of this.reviews) {
        sum += review.rating
        count++
    }
    return sum / count
})
module.exports = mongoose.model('Information', InformationSchema)