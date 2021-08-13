const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PhotoSchema = require('./image')
const postSchema = new Schema({
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: String,
    photos: [PhotoSchema],
    pay: {
        type: Boolean,
        required: true
    },
    phone: {
        type: Number
    },
    time: {
        type: Date,
        required: true
    },
    validity: {
        type: Number,
        enum: [6, 12, 24],
        required: true
    }
})
module.exports = mongoose.model('Post', postSchema)