const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/DLSUGuidedb';

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };

mongoose.connect(databaseURL, options);

const devSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true},
    bio: { type: String, required: true }
});

module.exports = mongoose.model('devs', devSchema);