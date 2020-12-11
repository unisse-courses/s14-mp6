const User = require('./models/users.js');
const Article = require('./models/articles.js')
const database = require('./models/db.js');

const bcrypt = require('bcrypt');

database.connect();

let testAccountPassword = 'password';
let editorAccountPassword = 'root';

const deleteUsers = () => {
    return new Promise((resolve, reject) => {
        database.deleteMany(User, {}, () => {
            console.log('All user data deleted');
            resolve();
        });
    });
};
const addTestAccount = () => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(testAccountPassword, 10, (err, hash) => {
            let testAccount = {
                name: "Test Account",
                email: "test-account-email",
                password: hash,
                bio: "no bio",
                userTypeEditor: false
            };

            database.insertOne(User, testAccount, (result) => {
                console.log('Added Test Account');
                resolve();
            });
        });
    });
};
const addAdminAccount = () => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(editorAccountPassword, 10, (err, hash) => {
            let editorAccount = {
                name: "Editor Account",
                email: "editor-account-email",
                password: hash,
                bio: "no bio",
                userTypeEditor: true
            }; 

            database.insertOne(User, editorAccount, (result) => {
                console.log('Added editor account');
                resolve();
            });
        });
    });
};

const addData = async() => {
    console.log("\x1b[32m[RESETTING DATABASE...]\x1b[0m");
    await deleteUsers();
    await addTestAccount();
    await addAdminAccount();
    console.log("\x1b[32m[RESET COMPLETE]\x1b[0m");
};

addData().then((result) => {
    process.exit();
});