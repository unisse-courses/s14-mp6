const Article = require('../models/articles.js');
const fs = require('fs');
const database = require('../models/db.js');
const { ObjectID } = require('mongodb');
const { validationResult } = require('express-validator');

const articleController = {
    postArticle: function (req, res) {

    },

    findArticle: function (req, res) {
        var query = req.query.id;
        database.findOne(Article, { _id: query }, {}, function (article) {
            console.log(article.title);

            if (article.published) {
                res.render('article', {
                    layout: '/layouts/main',
                    title: article.title + ' - DLSU Guide',
                    article: article
                });
            }
            else {
                res.redirect('/404');
            }
        });
    }
}

module.exports = articleController;