// import module `express`
const express = require('express');
const multer = require('multer');
const path = require('path');
const database = require('../models/db.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');
const articleController = require('../controller/articleController.js');
const logInController = require('../controller/logInController.js');
const userController = require('../controller/userController.js');
const { log } = require('handlebars');
const { isError } = require('util');
const { editPassword } = require('../controller/userController.js');

const app = express();

// SET STORAGE FOR ATTACHMENT
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname)
    // cb(null, file.fieldname + path.extname(file.originalname))
    cb(null, file.fieldname)
  }
})

var email_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
var email_upload = multer({ storage: email_storage })
// var home_upload = multer({ home_storage: home_storage })

app.use(bodyParser.urlencoded({ extended: true }));

//Init Sessions
app.use(session({
  key: 'user_sid', //user session id
  secret: 'initative',
  resave: false,
  saveUninitialized: true,
  store: database.sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 Day.
  }
}));

//pages

app.get('/', controller.getHome);
app.get('/home', controller.getHome);

app.get('/about', controller.getAbout);

app.get('/classrooms', controller.getClassrooms);
app.get('/offices', controller.getOffices);
app.get('/food', controller.getFood);

app.get('/article', articleController.findArticle);

/* ---------------------------------------------------------- */

app.get('/register', controller.getRegister);
app.post('/addUser', userController.postUser);
app.get('/login', controller.getLogin);
app.post('/checkLogin', logInController.checkLogin);
app.post('/logout', logInController.postLogout);

app.get('/myprofile', controller.getMyProfile);
app.get('/editprofile', controller.getMyProfileEdit);
app.post('/updateDetails', userController.updateDetails);
app.post('/updatePassword', userController.updatePassword);
app.post('/deleteAccount', userController.deleteUser);

app.get('/myarticles', controller.getMyArticles);
app.get('/newarticle', controller.getNewArticle);
app.post('/newarticle', articleController.postArticle);
app.get('/editarticle', controller.getEditArticle);
app.post('/editarticle', articleController.editArticle);
app.post('/deletearticle', articleController. deleteArticle);

app.post('/imageupload', articleController.postImage);

app.get('/404', controller.get404);
app.use((req, res, next) => {
  res.status(404).redirect("/404");
});
// enables to export app object when called in another .js file
module.exports = app;