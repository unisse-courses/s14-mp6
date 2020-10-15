const bcrypt = require('bcrypt');
const session = require('express-session');

const database = require('../models/db.js');
const User = require('../models/users.js');

const helper = require('./helper.js')

const logIncontroller = {
    checkLogin: function (req, res) {
        var email = helper.sanitize(req.body.email);
        var password = helper.sanitize(req.body.password);
        
        var redirect = {
            success: true,
            url: 'myprofile'
        }

        var warninguser = {
            success: false,
            warning: 'Email not found!'
        }

        var warningpass = {
            success: false,
            warning: 'Incorrect password!'
        }

        database.findOne(User, { email: email }, {}, function (user) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, equal) {
                    if (equal) {
                        req.session.name = user.name;
                        req.session.email = user.email;
                        req.session._id = user._id;

                        res.status('200').send(redirect);
                    }
                    else {
                        res.status('200').send(warningpass);
                    }
                });
            }
            else {
                res.status('200').send(warninguser);
            }
        })
    },

    postLogout: function (req, res) {
        var response = {
            success: req.session.name && req.cookies.user_sid,
            url: 'login'
        };
        
        res.status(200).send(response);
        req.session.destroy();
    },
}

// enables to export controller object when called in another .js file
module.exports = logIncontroller;