// server.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

/*
app.get('/', function(req, res) {
  res.send('Hello World!');
});
*/

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