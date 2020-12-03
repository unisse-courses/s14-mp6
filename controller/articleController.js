const Article = require('../models/articles.js');
const User = require('../models/users.js');
const fs = require('fs');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');
const { request } = require('express');

const articleController = {
    
    findArticle: function (req, res) {
        database.findOne(Article, { _id: req.query.id }, {}, function (article) {
            if (article) {
                database.findOne(User, {_id: article.authorid}, {}, function(user) {
                    if (article.published) {
                        res.render('article', {
                            layout: '/layouts/main',
                            title: article.title + ' - DLSU Guide',
                            article: article,
                            author: user.name
                        });
                    }
                    else {
                        res.redirect('/404');
                    }
                });
            } else {
                res.redirect('/404');
            }
            
        });
    },

    postArticle: function (req, res) {
        var today = new Date();
        var newArticle = {
            title: req.body.title,
            image: req.session.image,
            content: req.body.content,
            category: req.body.category,
            authorid: req.session._id,
            date: (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear(),
            published: req.body.published,
            featured: false
        };

        database.insertOne(Article, newArticle, (result) => {
            res.status(200).send( {url: '/myarticles'} );
        });
    },

    editArticle: function (req, res) {
        database.findOne(Article, {_id: req.body._id}, {}, function (article) {
            var newArticle = {
                title: req.body.title,
                image: req.session.image,
                content: req.body.content,
                category: req.body.category,
                authorid: article.authorid,
                date: article.date,
                published: req.body.published,
                featured: article.featured
            };

            database.updateOne(Article, {_id: req.body._id}, newArticle);
            res.status(200).send( {url: '/myarticles'} );
        });
    },

    deleteArticle: function (req, res) {
        //remove file here

        database.deleteOne(Article, {_id: ObjectID(req.body._id)});
        res.status(200).send({url: '/myarticles'});
    },

    postImage: function (req, res) {
        req.session.image = req.body.image;
        
        res.status(200).send();

        console.log("image updated");
        console.log(req.session.image.substring(0, 20))
    }
}

module.exports = articleController;