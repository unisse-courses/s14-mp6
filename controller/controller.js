// import module from db.js in models directory
const database = require('../models/db.js');
const Articles = require('../models/articles.js');
const Users = require('../models/users.js');

const controller = {
    
    getHome: function (req, res) {  
        Articles.countDocuments({ published: {$eq: true} }, function (err, count) {
            var perPage = 6;
            var page = req.query.page || 1;
            
            Articles
            .find( {published: {$eq: true} })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec(function (err, articleArray) {
                database.findMany(Articles, {featured: {$eq: true}}, {}, function (featuredArray) {
                    articleArray.forEach(function(doc) {
                        doc.title = doc.title.substring(0, 20);
                        doc.author = doc.author.substring(0, 20);
                        doc.content = doc.content.substring(0, 70);
                    });

                    featuredArray.forEach(function(doc) {
                        doc.title = doc.title.substring(0, 20);
                        doc.author = doc.author.substring(0, 20);
                        doc.content = doc.content.substring(0, 70);
                    });
                    
                    res.render('home', {
                        layout: '/layouts/main',
                        title: 'Home - DLSU Guide',
                        featured: featuredArray,
                        articles: articleArray,
                        
                        url: 'home',
                        current: page,
                        pages: Math.ceil(count / perPage),
                        if_search: false,
                    });
                });
            });
        });
    },

    getClassrooms: function (req, res) {
        var type = 'Classrooms';
        var link = 'classrooms';

        var query = {
            category: {$eq: link},
            published: {$eq: true}
        };

        Articles.countDocuments(query, function (err, count) {
            var perPage = 6;
            var page = req.query.page || 1;
            
            Articles
            .find(query)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec(function (err, articleArray) {
                articleArray.forEach(function(doc) {
                    doc.title = doc.title.substring(0, 20);
                    doc.author = doc.author.substring(0, 20);
                    doc.content = doc.content.substring(0, 70);
                });
                
                res.render('category', {
                    layout: '/layouts/main',
                    title: type + ' - DLSU Guide',
                    category: type,
                    description: 'Articles all about ' + type,
                    articles: articleArray,
                    
                    url: link,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    if_search: false,
                });
            });
        });
    },

    getOffices: function (req, res) {
        var type = 'Offices';
        var link = 'offices';

        var query = {
            category: {$eq: link},
            published: {$eq: true}
        };

        Articles.countDocuments(query, function (err, count) {
            var perPage = 6;
            var page = req.query.page || 1;
            
            Articles
            .find(query)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec(function (err, articleArray) {
                articleArray.forEach(function(doc) {
                    doc.title = doc.title.substring(0, 20);
                    doc.author = doc.author.substring(0, 20);
                    doc.content = doc.content.substring(0, 70);
                });
                
                res.render('category', {
                    layout: '/layouts/main',
                    title: type + ' - DLSU Guide',
                    category: type,
                    description: 'Articles all about ' + type,
                    articles: articleArray,
                    
                    url: link,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    if_search: false,
                });
            });
        });
    },

    getFood: function (req, res) {
        var type = 'Food';
        var link = 'food';

        var query = {
            category: {$eq: link},
            published: {$eq: true}
        };

        Articles.countDocuments(query, function (err, count) {
            var perPage = 6;
            var page = req.query.page || 1;
            
            Articles
            .find(query)
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec(function (err, articleArray) {
                articleArray.forEach(function(doc) {
                    doc.title = doc.title.substring(0, 20);
                    doc.author = doc.author.substring(0, 20);
                    doc.content = doc.content.substring(0, 70);
                });
                
                res.render('category', {
                    layout: '/layouts/main',
                    title: type + ' - DLSU Guide',
                    category: type,
                    description: 'Articles all about ' + type,
                    articles: articleArray,
                    
                    url: link,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    if_search: false,
                });
            });
        });
    },

    getAbout: function (req, res) {
        res.render('about', {
            layout: '/layouts/main',
            title: 'About - DLSU Guide',
        });
    },

    get404: function (req, res) {
        res.render('404', {
            layout: 'layouts/main',
            title: '404 Not Found - DLSU Guide'
        });
    }
}

// enables to export controller object when called in another .js file
module.exports = controller;