const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2, 
        max: 50
    },
    userName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);