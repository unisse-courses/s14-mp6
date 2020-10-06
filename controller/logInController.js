const bcrypt = require('bcrypt');
const session = require('express-session');

const database = require('../models/db.js');
const User = require('../models/users.js');

const helper = require('./helper.js')

const logIncontroller = {

    postLogIn: function (req, res) {
        var email = helper.sanitize(req.body.email);
        var password = helper.sanitize(req.body.pass);

        console.log('email');
        console.log('password');

        database.findOne(User, { email: email }, {}, function (email) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, equal) {
                    if (equal) {
                        console.log('Username and password is correct.. Redirecting..');
                        req.session.name = user.name;
                        req.session.email = user.email;
                        req.session.userid = user._id;
                        res.redirect('/404');
                    }
                    else {
                        res.render('/home', {
                            layout: '/layouts/main',
                            title: 'Home - DLSU Guide',
                        });
                    }
                });
            }
            else {
                res.render('/home', {
                    layout: '/layouts/main',
                    title: 'Home - DLSU Guide',
                });
            }
        })
    },

    checkLogin: function (req, res) {
        var email = helper.sanitize(req.body.email);
        var password = helper.sanitize(req.body.pass);

        database.findOne(User, { email: email }, {}, function (email) {
            if (email) {
                bcrypt.compare(password, user.password, function (err, equal) {
                    if (equal) {
                        console.log('Username and password is correct.. Redirecting..');
                        req.session.name = user.name;
                        req.session.email = user.email;
                        req.session.userid = user._id;
                        res.redirect('/success');
                    }
                    else {
                        res.render('/home', {
                            layout: '/layouts/main',
                            title: 'Home - DLSU Guide',
                        });
                    }
                });
            }
            else {
                res.render('/home', {
                    layout: '/layouts/main',
                    title: 'Home - DLSU Guide',
                });
            }
        })
    }
}

// enables to export controller object when called in another .js file
module.exports = logIncontroller;