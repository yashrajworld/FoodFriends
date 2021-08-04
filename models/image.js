const mongoose = require('mongoose')
const PhotoSchema = new mongoose.Schema({
    url: String,
    filename: String
})
module.exports = PhotoSchema