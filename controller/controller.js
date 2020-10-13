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
                    
                    if (req.session.name && req.cookies.user_sid) {
                        loggedin = true;
                        name = req.session.name;
                    } else {
                        loggedin = false;
                        name = null;
                    }

                    res.render('home', {
                        layout: '/layouts/main',
                        title: 'Home - DLSU Guide',

                        loggedin: loggedin,
                        name: name,

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
                
                if (req.session.name && req.cookies.user_sid) {
                    loggedin = true;
                    name = req.session.name;
                } else {
                    loggedin = false;
                    name = null;
                }

                res.render('category', {
                    layout: '/layouts/main',
                    title: type + ' - DLSU Guide',

                    loggedin: loggedin,
                    name: name,

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
                
                if (req.session.name && req.cookies.user_sid) {
                    loggedin = true;
                    name = req.session.name;
                } else {
                    loggedin = false;
                    name = null;
                }

                res.render('category', {
                    layout: '/layouts/main',
                    title: type + ' - DLSU Guide',
                    
                    loggedin: loggedin,
                    name: name,
                    
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
                
                if (req.session.name && req.cookies.user_sid) {
                    loggedin = true;
                    name = req.session.name;
                } else {
                    loggedin = false;
                    name = null;
                }

                res.render('category', {
                    layout: '/layouts/main',
                    title: type + ' - DLSU Guide',
                    
                    loggedin: loggedin,
                    name: name,
                    
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
        if (req.session.name && req.cookies.user_sid) {
            loggedin = true;
            name = req.session.name;
        } else {
            loggedin = false;
            name = null;
        }
        
        res.render('about', {
            layout: '/layouts/main',
            title: 'About - DLSU Guide',

            loggedin: loggedin,
            name: name,
        });
    },

    get404: function (req, res) {
        if (req.session.name && req.cookies.user_sid) {
            loggedin = true;
            name = req.session.name;
        } else {
            loggedin = false;
            name = null;
        }
        
        res.render('404', {
            layout: 'layouts/main',
            title: '404 Not Found - DLSU Guide',

            loggedin: loggedin,
            name: name,
        });
    },

    getLogin: function (req, res) {
        res.render('login', {
            layout: 'layouts/main',
            title: 'Log In - DLSU Guide'
        });
    },

    getRegister: function (req, res) {
        res.render('register', {
            layout: 'layouts/main',
            title: 'Register - DLSU Guide'
        });
    },

    getMyProfile: function (req, res) {
        if (req.session.name && req.cookies.user_sid) {
            database.findOne(Users, { _id: req.session._id }, {}, function(user) {
                res.render('myprofile', {
                    layout: 'layouts/main',
                    title: user.name,

                    loggedin: true,
                    
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                })
            })
        } else {
            res.redirect('/login');
        }
    },
}

// enables to export controller object when called in another .js file
module.exports = controller;