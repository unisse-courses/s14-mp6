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
		author: "a1",
		date: "1/1/2020",
		published: true,
		featured: false
	},
	{
        title: "Article2",
        content: "article1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Risus nec feugiat in fermentum. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Bibendum ut tristique et egestas quis ipsum suspendisse. Consequat nisl vel pretium lectus quam id. Massa tincidunt nunc pulvinar sapien et ligula. Diam volutpat commodo sed egestas egestas fringilla. Nulla porttitor massa id neque aliquam. Tincidunt arcu non sodales neque. Id interdum velit laoreet id donec ultrices. Proin libero nunc consequat interdum varius sit. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.",
		category: "classrooms",
		author: "a1",
		date: "1/2/2020",
		published: true,
		featured: false
	},
	{
        title: "Article3",
        content: "article1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Risus nec feugiat in fermentum. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Bibendum ut tristique et egestas quis ipsum suspendisse. Consequat nisl vel pretium lectus quam id. Massa tincidunt nunc pulvinar sapien et ligula. Diam volutpat commodo sed egestas egestas fringilla. Nulla porttitor massa id neque aliquam. Tincidunt arcu non sodales neque. Id interdum velit laoreet id donec ultrices. Proin libero nunc consequat interdum varius sit. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.",
		category: "classrooms",
		author: "a1",
		date: "1/3/2020",
		published: true,
		featured: false
    },
    {
		title: "Article4",
		content: "article2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Posuere urna nec tincidunt praesent semper feugiat. Eget nulla facilisi etiam dignissim diam. Platea dictumst quisque sagittis purus sit amet volutpat. Eu facilisis sed odio morbi quis. Volutpat diam ut venenatis tellus in metus. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Vitae proin sagittis nisl rhoncus mattis. Et sollicitudin ac orci phasellus egestas tellus rutrum. Pharetra convallis posuere morbi leo urna molestie.",
		category: "offices",
		author: "a2",
		date: "1/2/2020",
		published: true,
		featured: false
	  
	},
	{
		title: "Article5",
		content: "article2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Posuere urna nec tincidunt praesent semper feugiat. Eget nulla facilisi etiam dignissim diam. Platea dictumst quisque sagittis purus sit amet volutpat. Eu facilisis sed odio morbi quis. Volutpat diam ut venenatis tellus in metus. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Vitae proin sagittis nisl rhoncus mattis. Et sollicitudin ac orci phasellus egestas tellus rutrum. Pharetra convallis posuere morbi leo urna molestie.",
		category: "offices",
		author: "a2",
		date: "1/2/2020",
		published: true,
		featured: false
	  
	},
	{
		title: "Article6",
		content: "article2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit ut aliquam purus sit amet. Posuere urna nec tincidunt praesent semper feugiat. Eget nulla facilisi etiam dignissim diam. Platea dictumst quisque sagittis purus sit amet volutpat. Eu facilisis sed odio morbi quis. Volutpat diam ut venenatis tellus in metus. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Vitae proin sagittis nisl rhoncus mattis. Et sollicitudin ac orci phasellus egestas tellus rutrum. Pharetra convallis posuere morbi leo urna molestie.",
		category: "offices",
		author: "a2",
		date: "1/2/2020",
		published: true,
		featured: false
	  
    },
    {
		title: "Article7",
		content: "article3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus commodo viverra maecenas accumsan lacus vel facilisis. Interdum velit laoreet id donec ultrices tincidunt arcu. Est lorem ipsum dolor sit. Aliquet lectus proin nibh nisl condimentum id. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Porttitor lacus luctus accumsan tortor posuere ac. Sapien faucibus et molestie ac feugiat sed. Bibendum neque egestas congue quisque. Viverra suspendisse potenti nullam ac tortor. Libero volutpat sed cras ornare. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Magna fermentum iaculis eu non diam phasellus.",
		category: "food",
		author: "a3",
		date: "1/3/2020",
		published: true,
		featured: false
	},
	{
		title: "Article8",
		content: "article3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus commodo viverra maecenas accumsan lacus vel facilisis. Interdum velit laoreet id donec ultrices tincidunt arcu. Est lorem ipsum dolor sit. Aliquet lectus proin nibh nisl condimentum id. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Porttitor lacus luctus accumsan tortor posuere ac. Sapien faucibus et molestie ac feugiat sed. Bibendum neque egestas congue quisque. Viverra suspendisse potenti nullam ac tortor. Libero volutpat sed cras ornare. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Magna fermentum iaculis eu non diam phasellus.",
		category: "food",
		author: "a3",
		date: "1/3/2020",
		published: true,
		featured: false
	},
	{
		title: "Article9",
		content: "article3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus commodo viverra maecenas accumsan lacus vel facilisis. Interdum velit laoreet id donec ultrices tincidunt arcu. Est lorem ipsum dolor sit. Aliquet lectus proin nibh nisl condimentum id. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Porttitor lacus luctus accumsan tortor posuere ac. Sapien faucibus et molestie ac feugiat sed. Bibendum neque egestas congue quisque. Viverra suspendisse potenti nullam ac tortor. Libero volutpat sed cras ornare. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Magna fermentum iaculis eu non diam phasellus.",
		category: "food",
		author: "a3",
		date: "1/3/2020",
		published: true,
		featured: false
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
	}
	
	database.deleteMany(Users, {}, function() {});
	database.insertOne(Users, user, (result) => {
        console.log(result);
    });
})