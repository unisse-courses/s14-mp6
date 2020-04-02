const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

const articleModel = require('./models/articles');

const app = express();
const port = 3000;

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
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*Home*/
app.get('/', function(req, res) {
    articleModel.find({}).exec(function(err, result) {
        var articleObjects = [];
        result.forEach(function(doc) {
            articleObjects.push(doc.toObject());
        });

        res.render('index', {
            articles: articleObjects
        });
    });
});

/*Categories*/
var categories = ["Classrooms", "Food", "Offices"];
app.get('/' + categories[0], function(req, res) {
    var filter = {category: {$eq: categories[0]}};
    articleModel.find(filter).exec(function(err, result) {
        var articleObjects = [];
        result.forEach(function(doc) {
            articleObjects.push(doc.toObject());
        });

        res.render(categories[0], {
            articles: articleObjects
        });
    });
});
app.get('/' + categories[1], function(req, res) {
    var filter = {category: {$eq: categories[1]}};
    articleModel.find(filter).exec(function(err, result) {
        var articleObjects = [];
        result.forEach(function(doc) {
            articleObjects.push(doc.toObject());
        });

        res.render(categories[1], {
            articles: articleObjects
        });
    });
});
app.get('/' + categories[2], function(req, res) {
    var filter = {category: {$eq: categories[2]}};
    articleModel.find(filter).exec(function(err, result) {
        var articleObjects = [];
        result.forEach(function(doc) {
            articleObjects.push(doc.toObject());
        });

        res.render(categories[2], {
            articles: articleObjects
        });
    });
});

app.get('/about', function(req, res) {
});

/*Articles*/
app.get('/1', function(req, res) {
	var filter = {key: '1'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('1', {
			article: result.toObject()
		});
	});
});

app.get('/2', function(req, res) {
	var filter = {key: '2'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('2', {
			article: result.toObject()
		});
	});
});

app.get('/3', function(req, res) {
	var filter = {key: '3'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('3', {
			article: result.toObject()
		});
	});
});

app.get('/4', function(req, res) {
	var filter = {key: '4'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('4', {
			article: result.toObject()
		});
	});
});

app.get('/5', function(req, res) {
	var filter = {key: '5'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('5', {
			article: result.toObject()
		});
	});
});

app.get('/6', function(req, res) {
	var filter = {key: '6'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('6', {
			article: result.toObject()
		});
	});
});

app.get('/7', function(req, res) {
	var filter = {key: '7'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('7', {
			article: result.toObject()
		});
	});
});

app.get('/8', function(req, res) {
	var filter = {key: '8'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('8', {
			article: result.toObject()
		});
	});
});

app.get('/9', function(req, res) {
	var filter = {key: '9'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('9', {
			article: result.toObject()
		});
	});
});

app.get('/10', function(req, res) {
	var filter = {key: '10'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('10', {
			article: result.toObject()
		});
	});
});

app.get('/11', function(req, res) {
	var filter = {key: '11'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('11', {
			article: result.toObject()
		});
	});
});

app.get('/12', function(req, res) {
	var filter = {key: '12'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('12', {
			article: result.toObject()
		});
	});
});

app.get('/13', function(req, res) {
	var filter = {key: '13'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('13', {
			article: result.toObject()
		});
	});
});

app.get('/14', function(req, res) {
	var filter = {key: '14'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('14', {
			article: result.toObject()
		});
	});
});

app.get('/15', function(req, res) {
	var filter = {key: '15'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('15', {
			article: result.toObject()
		});
	});
});

app.get('/16', function(req, res) {
	var filter = {key: '16'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('16', {
			article: result.toObject()
		});
	});
});

app.get('/17', function(req, res) {
	var filter = {key: '17'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('17', {
			article: result.toObject()
		});
	});
});

app.get('/18', function(req, res) {
	var filter = {key: '18'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('18', {
			article: result.toObject()
		});
	});
});

app.get('/19', function(req, res) {
	var filter = {key: '19'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('19', {
			article: result.toObject()
		});
	});
});

app.get('/20', function(req, res) {
	var filter = {key: '20'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('20', {
			article: result.toObject()
		});
	});
});

app.get('/21', function(req, res) {
	var filter = {key: '21'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('21', {
			article: result.toObject()
		});
	});
});

app.get('/22', function(req, res) {
	var filter = {key: '22'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('22', {
			article: result.toObject()
		});
	});
});

app.get('/23', function(req, res) {
	var filter = {key: '23'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('23', {
			article: result.toObject()
		});
	});
});

app.get('/24', function(req, res) {
	var filter = {key: '24'};
	articleModel.findOne(filter).exec(function(err, result) {
		res.render('24', {
			article: result.toObject()
		});
	});
});