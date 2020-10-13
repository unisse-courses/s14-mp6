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

        var warning = {
            success: false,
            url: null
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
                        res.status('200').send(warning);
                    }
                });
            }
            else {
                res.status('200').send(warning);
            }
        })
    }
}

// enables to export controller object when called in another .js file
module.exports = logIncontroller;