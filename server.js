// server.js
var http = require("http");
var fs = require('fs');
var express = require("express");
var logfmt = require("logfmt");
var app = express();


app.get('/search', function(req, searchRes) {
	var query = req.query.q;
	console.log("QUERY: " + query);

	if (query == "aaron") {
		fs.readFile(__dirname + '/cache/SearchServices/aaron.json', 'utf8', function (err, data) {
			searchRes.writeHead(200, {'Content-Type': 'application/json'});
			searchRes.write(data);
			searchRes.end();
		});
	} else {
		var options = {
			host: "www.albaspectrum.com",
			port: 8210,
			path: '/CS480WebService/CS480WebService.svc/SearchServices/' + query,
			method: 'GET'
		};

		http.request(options, function(res) {
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));

			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log('BODY: ' + chunk);

				var obj = JSON.parse(chunk);
				searchRes.writeHead(200, {'Content-Type': 'application/json'});
				searchRes.write(chunk);
			});
		}).end();
	}
});


app.configure(function () {
	app.use(logfmt.requestLogger());
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(express.static(__dirname + "/public"));
	app.use(express.errorHandler({
		dumbExceptions: true,
		showStack: true
	}));
	app.use(app.router);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
