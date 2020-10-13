const User = require('../models/users.js');
const fs = require('fs');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

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
                        bio: ""
                    }
                    
                    database.insertOne(User, newUser, (result) => {
                        res.status(200).send(redirect);
                    });
                })
            }
        })
    },
}

module.exports = userController;