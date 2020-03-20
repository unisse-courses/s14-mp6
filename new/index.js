const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

const app = express();
const port = 9090;

app.use(express.static('public'));

app.listen(port, function() {
    console.log('App listening at port '  + port)
  });

app.engine( 'hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  // Additional helpers declared to reformat text prior to rendering
  helpers: {
    cap: function(text) { return text.toUpperCase(); },
    em: function(text) {
      var x = `<em>${text}</em>`;
      /**
        handlebars and express-handlebars are 2 different packages.
        express-handlebars basically is a wrapper to make it shorter to write handlebars code
        in express apps.

        the SafeString function is not available in express-handlebars so we need to install
        and use the main handlebars package to access the function.
      **/
      return new handlebars.SafeString(x);
    }
  }
}));

app.set('view engine', 'hbs');

/*=============================================================================================================*/

const fs = require('fs');
var articles = JSON.parse(fs.readFileSync('articles.json'));
var featured = JSON.parse(fs.readFileSync('featured.json'));

var filter = function(category) {
    var filtered = [];
    for (var i = 0; i < articles.length; i++)
        if (articles[i].category === category)
            filtered.push(articles[i]);

    return filtered;
}

var notself = function(array, itself) {
    var notself = [];
    for (var i = 0; i < array.length; i++)
        if (!(array[i] === itself))
            notself.push(array[i]);
    
    return notself;
}

app.get('/', function(req, res) {
    res.render('index', {
        featured: featured,
        articles: articles,
    })
});
app.get('/Classrooms', function(req, res) {
    res.render('Classrooms', {
        articles: filter('Classrooms')
    })
});
app.get('/Offices', function(req, res) {
    res.render('Offices', {
        articles: filter('Offices')
    })
});
app.get('/Food', function(req, res) {
    res.render('Food', {
        articles: filter('Food')
    })
});
app.get('/about', function(req, res) {
    res.render('about', {
        
    })
});

/*
for (var i = 1; i <= articles.length; i++)
{
    app.get('/' + i, function(req, res) {
        res.render('' + i, {
            article: articles[i - 1],
            articles: notself(filter(articles[i - 1].category), articles[i - 1])
        })
    });

    console.log(articles[i - 1]);
}
*/

app.get('/1', function(req, res) {
    res.render('1', {
        article: articles[0],
        articles: notself(filter(articles[0].category), articles[0])
    })
});

app.get('/2', function(req, res) {
    res.render('2', {
        article: articles[1],
        articles: notself(filter(articles[1].category), articles[1])
    })
});

app.get('/3', function(req, res) {
    res.render('3', {
        article: articles[2],
        articles: notself(filter(articles[2].category), articles[2])
    })
});

app.get('/4', function(req, res) {
    res.render('4', {
        article: articles[1],
        articles: notself(filter(articles[3].category), articles[3])
    })
});

app.get('/5', function(req, res) {
    res.render('5', {
        article: articles[1],
        articles: notself(filter(articles[4].category), articles[4])
    })
});
