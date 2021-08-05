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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location: String,
    description: String,
    photos: [PhotoSchema],
    pay: {
        type: boolean,
        required: true
    },
    contactmail: {
        type: String,
        required: true
    },
    contactphone: {
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