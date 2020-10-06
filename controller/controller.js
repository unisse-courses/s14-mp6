// import module from db.js in models directory
const database = require('../models/db.js');
const Articles = require('../models/articles.js');
const Users = require('../models/users.js');

const controller = {
    
    getHome: function (req, res) {  
        Articles.countDocuments({ published: {$eq: true} }, function (err, count) {
            var perPage = 1;
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

    getAbout: function (req, res) {
        res.render('about', {
            layout: '/layouts/main',
            title: 'About - DLSU Guide',
        });
    },

    getClassrooms: function (req, res) {
        var query = {category: {$eq: 'classrooms'}};
        database.findMany(Articles, query, {}, function (articleArray) {
            articleArray.forEach(function(doc) {
                doc.title = doc.title.substring(0, 20);
                doc.author = doc.author.substring(0, 20);
                doc.content = doc.content.substring(0, 70);
            });

            res.render('category', {
                layout: '/layouts/main',
                title: 'Classrooms - DLSU Guide',
                category: 'Classrooms',
                description: 'Articles all about Classrooms',
                articles: articleArray
            });
        });
    },

    getOffices: function (req, res) {
        var query = {category: {$eq: 'offices'}};
        database.findMany(Articles, query, {}, function (articleArray) {
            articleArray.forEach(function(doc) {
                doc.title = doc.title.substring(0, 20);
                doc.author = doc.author.substring(0, 20);
                doc.content = doc.content.substring(0, 70);
            });

            res.render('category', {
                layout: '/layouts/main',
                title: 'Offices - DLSU Guide',
                category: 'Offices',
                description: 'Articles all about Offices',
                articles: articleArray
            });
        });
    },

    getFood: function (req, res) {
        var query = {category: {$eq: 'food'}};
        database.findMany(Articles, query, {}, function (articleArray) {
            articleArray.forEach(function(doc) {
                doc.title = doc.title.substring(0, 20);
                doc.author = doc.author.substring(0, 20);
                doc.content = doc.content.substring(0, 70);
            });

            res.render('category', {
                layout: '/layouts/main',
                title: 'Food - DLSU Guide',
                category: 'Food',
                description: 'Articles all about Food',
                articles: articleArray
            });
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