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
                var articleArrayAuthorNames = [];
                articleArray.forEach(function(doc) {
                    var newArticle = {
                        _id: doc._id,
                        title: doc.title.substring(0, 20),
                        image: doc.image,
                        content: doc.content.substring(0, 70),
                        category: doc.category,
                        author: null,
                        date: doc.date,
                    };

                    database.findOne(Users, { _id: {$eq: doc.authorid} }, {}, function (user) {
                        newArticle.author = user.name;
                        articleArrayAuthorNames.push(newArticle);
                    });
                });
                
                database.findMany(Articles, {featured: true}, {}, function (featuredArray) {
                    var featuredArrayAuthorNames = [];
                    featuredArray.forEach(function(doc) {
                        var newArticle = {
                            _id: doc._id,
                            title: doc.title.substring(0, 20),
                            image: doc.image,
                            content: doc.content.substring(0, 70),
                            category: doc.category,
                            author: null,
                            date: doc.date,
                        };

                        database.findOne(Users, { _id: {$eq: doc.authorid} }, {}, function (user) {
                            newArticle.author = user.name;
                            featuredArrayAuthorNames.push(newArticle);
                        });
                    });

                    if (req.session.name) {
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
    
                        featured: featuredArrayAuthorNames,
                        articles: articleArrayAuthorNames,
                        
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
                var articleArrayAuthorNames = [];
                articleArray.forEach(function(doc) {
                    var newArticle = {
                        _id: doc._id,
                        title: doc.title.substring(0, 20),
                        image: doc.image,
                        content: doc.content.substring(0, 70),
                        category: doc.category,
                        author: null,
                        date: doc.date,
                    };

                    database.findOne(Users, { _id: {$eq: doc.authorid} }, {}, function (user) {
                        newArticle.author = user.name;
                        articleArrayAuthorNames.push(newArticle);
                    });
                });
                
                
                if (req.session.name) {
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
                    articles: articleArrayAuthorNames,
                    
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
                var articleArrayAuthorNames = [];
                articleArray.forEach(function(doc) {
                    var newArticle = {
                        _id: doc._id,
                        title: doc.title.substring(0, 20),
                        image: doc.image,
                        content: doc.content.substring(0, 70),
                        category: doc.category,
                        author: null,
                        date: doc.date,
                    };

                    database.findOne(Users, { _id: {$eq: doc.authorid} }, {}, function (user) {
                        newArticle.author = user.name;
                        articleArrayAuthorNames.push(newArticle);
                    });
                });
                
                
                if (req.session.name) {
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
                    articles: articleArrayAuthorNames,
                    
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
                var articleArrayAuthorNames = [];
                articleArray.forEach(function(doc) {
                    var newArticle = {
                        _id: doc._id,
                        title: doc.title.substring(0, 20),
                        image: doc.image,
                        content: doc.content.substring(0, 70),
                        category: doc.category,
                        author: null,
                        date: doc.date,
                    };

                    database.findOne(Users, { _id: {$eq: doc.authorid} }, {}, function (user) {
                        newArticle.author = user.name;
                        articleArrayAuthorNames.push(newArticle);
                    });
                });
                
                
                if (req.session.name) {
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
                    articles: articleArrayAuthorNames,
                    
                    url: link,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    if_search: false,
                });
            });
        });
    },

    getAbout: function (req, res) {
        if (req.session.name) {
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
        if (req.session.name) {
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

    getRegister: function (req, res) {
        res.render('register', {
            layout: 'layouts/main',
            title: 'Register - DLSU Guide'
        });
    },

    getLogin: function (req, res) {
        if(req.session.name) {
            res.redirect('myprofile');
        } else {
            res.render('login', {
                layout: 'layouts/main',
                title: 'Log In - DLSU Guide'
            });
        }
    },

    getMyProfile: function (req, res) {
        if (req.session.name) {
            database.findOne(Users, { _id: req.session._id }, {}, function(user) {
                res.render('myprofile', {
                    layout: 'layouts/main',
                    title: user.name + ' - DLSU Guide',

                    loggedin: true,
                    
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                });
            });
        } else {
            res.redirect('login');
        }
    },

    getMyProfileEdit: function (req, res) {
        if (req.session.name) {
            database.findOne(Users, { _id: req.session._id }, {}, function(user) {
                res.render('editprofile', {
                    layout: 'layouts/main',
                    title: 'Edit Profile - DLSU Guide',

                    loggedin: true,
                    
                    name: user.name,
                    email: user.email,
                    bio: user.bio
                });
            });
        } else {
            res.redirect('login');
        }
    },

    getMyArticles: function (req, res) {
        if (req.session.name) {
            Articles.countDocuments({authorid: {$eq: req.session._id}}, function (err, count) {
                var perPage = 10;
                var page = req.query.page || 1;

                Articles
                .find( {authorid: req.session._id} )
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec(function (err, articleArray) {                    
                    res.render('myarticles', {
                        layout: '/layouts/main',
                        title: 'My Articles - DLSU Guide',

                        loggedin: true,
                        name: req.session.name,
                        
                        articles: articleArray,

                        url: 'myarticles',
                        current: page,
                        pages: Math.ceil(count / perPage),
                        if_search: false,
                    });
                });
            });
        } else {
            res.redirect('login');
        }
    },

    getNewArticle: function (req, res) {
        if (req.session.name) {
            res.render('newarticle', {
                layout: '/layouts/main',
                title: 'New Articles - DLSU Guide',

                loggedin: true,
                name: req.session.name,
            });
        } else {
            res.redirect('login');
        }
    },

    getEditArticle: function (req, res) {
        if (req.session.name) {
            database.findOne(Articles, {_id: req.query.id}, {}, function (article) {
                if (article.authorid == req.session._id) {
                    res.render('editarticle', {
                        layout: '/layouts/main',
                        title: 'Editing ' + article.title + ' - DLSU Guide',

                        loggedin: true,
                        name: req.session.name,
                        
                        article_id: article._id,
                        article_title: article.title,
                        article_image: article.image,
                        article_content: article.content,
                        article_category: article.category,
                        article_published: article.published,
                        article_date: article.date,
                    });
                } else {
                    res.redirect('404');
                }
            });
        } else {
            res.redirect('login');
        }
    }
}

// enables to export controller object when called in another .js file
module.exports = controller;