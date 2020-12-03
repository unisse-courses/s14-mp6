const User = require('./models/users.js');
const Article = require('./models/articles.js')
const db = require('./models/db.js');
const database = require('./models/db.js');

const bcrypt = require('bcrypt');

db.connect();

db.deleteMany(User, {}, function() {
    console.log('deleted all user data');
    
    let password = 'password'
    bcrypt.hash(password, 10, function(err, hash) {
        let user = {
            name: "Test Account",
            email: "test-account-email",
            password: hash,
            bio: "no bio",
            userTypeEditor: false
        };

        db.insertOne(User, user, (result) => {
            let password2 = 'root'
            bcrypt.hash(password2, 10, function(err, hash) {
                let user = {
                    name: "Editor",
                    email: "editor-email",
                    password: hash,
                    bio: "no bio",
                    userTypeEditor: true
                };

                db.insertOne(User, user, (result) => {
                    db.deleteMany(Article, {}, function() {
                        console.log('deleted all articles');
                        process.exit();
                    })
                });
            })
        });
    });
});