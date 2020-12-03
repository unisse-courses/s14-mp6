const User = require('../models/users.js');
const Article = require('../models/articles.js');
const fs = require('fs');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const { isError } = require('util');

const userController = {

    postUser: function (req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        var redirect = {
            success: true,
            message: 'Registration Successful!'
        };

        var warning = {
            success: false,
            message: 'Email already taken!'
        };

        database.findOne(User, { email: email }, {}, function (user) {
            if (user) {
                res.status(200).send(warning);
            }
            else {
                bcrypt.hash(password, 10, function(err, hash) {
                    let newUser = {
                        name: name,
                        email: email,
                        password: hash,
                        bio: "No Bio",
                        userTypeEditor: false
                    }
                    
                    database.insertOne(User, newUser, (result) => {
                        res.status(200).send(redirect);
                    });
                })
            }
        })
    },

    updateDetails: function (req, res) {        
        var filter = {
            _id: ObjectID(req.session._id)
        };
        
        if (req.session.email == req.body.email) {
            database.findOne(User, {_id: req.session._id}, {}, function (user) {
                var user_details = {
                    name: req.body.name,
                    email: user.email,
                    password: user.password,
                    bio: req.body.bio,
                    userTypeEditor: user.userTypeEditor
                };
    
                database.updateOne(User, filter, user_details);
                res.status(200).send( {message: 'Details updated!'} ); 
            });
        } else {
            database.findOne(User, {email: req.body.email}, {}, function (user) {
                if (user) {
                    res.status(200).send( {message: 'Email in use!'} ); 
                } else {
                    database.findOne(User, {_id: req.session._id}, {}, function (userpass) {
                        var user_details = {
                            name: req.body.name,
                            email: req.body.email,
                            password: userpass.password,
                            bio: req.body.bio,
                            userTypeEditor: user.userTypeEditor
                        };
    
                        database.updateOne(User, filter, user_details);
                        res.status(200).send( {message: 'Details updated!'} ); 
                    });
                }
            });
        }
    },

    updatePassword: function (req, res) {        
        database.findOne(User, { _id: req.session._id }, {}, function (user) {
            bcrypt.compare(req.body.passwordold, user.password, function (err, equal) {
                if (equal) {
                    bcrypt.hash(req.body.passwordnew, 10, function(err, hash) {
                        var filter = {
                            _id: ObjectID(req.session._id)
                        };

                        var user_details = {
                            name: user.name,
                            email: user.email,
                            password: hash,
                            bio: user.bio,
                            userTypeEditor: user.userTypeEditor
                        };

                        database.updateOne(User, filter, user_details);
                        res.status(200).send( {message: 'Details Updated!'} );
                    });
                } else {
                    res.status(200).send( {message: 'Incorrect Password!'} );
                }
            });
        });
    },

    deleteUser: function (req, res) {
        database.deleteMany(Article, {authorid: req.session._id}, function() {
            database.deleteOne(User, {_id: ObjectID(req.session._id)});
            req.session.destroy();
            res.status(200).send({url: '/home'});
        });
    },
}

module.exports = userController;