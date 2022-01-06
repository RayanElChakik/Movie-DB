const mongoose = require ('mongoose')

const movieSchema = new mongoose.Schema({
        title: String,
         year: Number,
         rating: Number
});

module.exports = mongoose.model('movies', movieSchema);