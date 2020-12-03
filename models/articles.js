const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/DLSUGuidedb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const articleSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true 
    },

    authorid: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    published: {
        type: Boolean,
        required: true
    },

    featured: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('articles', articleSchema);