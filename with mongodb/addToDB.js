const articleModel = require('./models/articles');

const fs = require('fs');
var articles = JSON.parse(fs.readFileSync('articles.json'));
var featured = JSON.parse(fs.readFileSync('featured.json'));

articleModel.deleteMany({}, function (err, res) {
    if(err) throw err;
    console.log('removed all articles!');
});

articleModel.insertMany(articles, function (err, res) {
    if (err) throw err;
    console.log('inserted articles');
});