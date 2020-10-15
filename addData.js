const database = require('./models/db.js');
const Articles = require('./models/articles.js');
const Users = require('./models/users.js');
const bcrypt = require('bcrypt');

database.connect();

var articles = [
    {
        title: "Article1",
        content: "article1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Risus nec feugiat in fermentum. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Bibendum ut tristique et egestas quis ipsum suspendisse. Consequat nisl vel pretium lectus quam id. Massa tincidunt nunc pulvinar sapien et ligula. Diam volutpat commodo sed egestas egestas fringilla. Nulla porttitor massa id neque aliquam. Tincidunt arcu non sodales neque. Id interdum velit laoreet id donec ultrices. Proin libero nunc consequat interdum varius sit. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.",
		category: "classrooms",
		authorid: "5f88330c48aea01a84ff8ff1",
		date: "1/1/2020",
		published: true,
		featured: true
	},
	{
        title: "Article2",
        content: "article1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Risus nec feugiat in fermentum. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Bibendum ut tristique et egestas quis ipsum suspendisse. Consequat nisl vel pretium lectus quam id. Massa tincidunt nunc pulvinar sapien et ligula. Diam volutpat commodo sed egestas egestas fringilla. Nulla porttitor massa id neque aliquam. Tincidunt arcu non sodales neque. Id interdum velit laoreet id donec ultrices. Proin libero nunc consequat interdum varius sit. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.",
		category: "classrooms",
		authorid: "5f88330c48aea01a84ff8ff1",
		date: "1/2/2020",
		published: true,
		featured: true
	},
];

database.deleteMany(Articles, {}, function() {});
database.insertMany(Articles, articles);

let email = 'test';
let password = 'test';

bcrypt.hash(password, 10, function(err, hash) {
	let user = {
        name: 'Test Name',
        email: email,
		password: hash,
		bio: 'No Bio'
	}
	
	database.deleteMany(Users, {}, function() {});
	database.insertOne(Users, user, (result) => {
        console.log(result);
    });
})