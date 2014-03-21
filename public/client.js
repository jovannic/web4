// support ajax queries

var templates = {
	"Customer": Handlebars.compile($("#temp-Customer").html()),
	"Order": Handlebars.compile($("#temp-Order").html()),
	"Address": Handlebars.compile($("#temp-Address").html()),
	"Item": Handlebars.compile($("#temp-Item").html()),
	"Payment": Handlebars.compile($("#temp-Payment").html())
};

function doQuery() {
	var q = document.getElementById("searchQuery").value;

	queryService(q, displayResult);
	$("#intro").addClass("hidden");

	return false;
}

function queryService(query, success) {
	$.getJSON("/search", {'q': query}, function(data) {
		success(data);
	});
}

function displayResult(data) {
	var div = $("#results-list");
	data.Results.forEach(function(entry) {
		var template = templates[entry.ContractType];
		div.append(template(entry));
	});
}

function printResult(data) {
	console.log(data);
}