const database = require('../models/db.js');
const User = require('../models/users.js');
const sanitize = require('mongo-sanitize');

const helper = {

    sanitize: function(query) {
        return sanitize(query);
    }
}

module.exports = helper;