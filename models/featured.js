const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/DLSUGuidedb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const featuredSchema = new mongoose.Schema({
    key: { type: String, required: true },
    title: { type: String, required: true},
    category: { type: String, required: true },
    author: { type: String, required: true },
    authoremail: {type: String, required: true},
    date: { type: String, required: true },
    imgext: { type: String, required: true },
    tags: [{ type: String, required: false }],
    text: [{ type: String, required: true }],
    comments: [{ type: String, required: false }]
});

module.exports = mongoose.model('featured', featuredSchema);