const featuredModel = require('./models/featured');
const articleModel = require('./models/articles');
const devModel = require('./models/devs');
const authorModel = require('./models/authors');

const fs = require('fs');
var featured = JSON.parse(fs.readFileSync('JSONdata/featured.json'));
var articles = JSON.parse(fs.readFileSync('JSONdata/articles.json'));
var devs = JSON.parse(fs.readFileSync('JSONdata/devs.json'));
var authors = JSON.parse(fs.readFileSync('JSONdata/authors.json'));

featuredModel.deleteMany({}, function (err, res) {
    if (err) throw err;
    console.log('removed featured!');
});

articleModel.deleteMany({}, function (err, res) {
    if(err) throw err;
    console.log('removed all articles!');
});

devModel.deleteMany({}, function (err, res) {
    if(err) throw err;
    console.log('removed all dev info!');
});

authorModel.deleteMany({}, function (err, res) {
    if (err) throw err;
    console.log('removed all author info!');
});

console.log('\n');

featuredModel.insertMany(featured, function (err, res) {
    if (err) throw err;
    console.log('inserted featured!');
});

articleModel.insertMany(articles, function (err, res) {
    if (err) throw err;
    console.log('inserted articles');
});

devModel.insertMany(devs, function (err, res) {
    if(err) throw err;
    console.log('inserted dev info!');
});

authorModel.insertMany(authors, function(err, res) {
    if (err) throw err;
    console.log('inserted author info!');
});