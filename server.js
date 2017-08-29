process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

var http = require('http');
var requestListener = function (request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	response.end('Hello You\n');
}
var server = http.createServer(requestListener);
//server.listen(8000);

const port = process.env.PORT || 1337;
const db = require('./config/db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



MongoClient.connect(db.url, (err, database) => {

	if (err) return console.log(err)
	require('./app/routes')(app, database);
	app.listen(port, () => {
		console.log("We are live on" + port);
	});

})