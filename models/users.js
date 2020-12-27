const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    userTypeEditor: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);