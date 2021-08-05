const { number } = require('joi')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Information'
    }
})
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)