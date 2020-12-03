const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes/routes.js');

const db = require('./models/db.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true,
  parameterLimit: 100000,
  limit: '50mb',
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.static('views'));
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.use('/', routes);
db.connect();

app.listen(port, function() {
    console.log('App listening at port '  + port)
});

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
hbs.registerHelper('repeat', require('handlebars-helper-repeat'));
hbs.registerHelper("add", function (a, b) {
  return parseInt(a) + b;
});
hbs.registerHelper("minus", function (a, b) {
  return parseInt(a) - b;
});
hbs.registerHelper('equals', function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('each_upto', function (ary, max, options) {
  if (!ary || ary.length == 0)
    return options.inverse(this);

  var result = [];
  for (var i = 0; i < max && i < ary.length; ++i)
    result.push(options.fn(ary[i]));
  return result.join('');
});