var http = require('http');
var url = require('url');
var getImgs = require('./getImgs')
var express = require('express');
var app = express();
app.use(express.static('../client'));
 
app.get('/index.html', function(request, response){
	response.sendFile(__dirname + "/" + "index.html");
});

app.get('/fetch_imgs', function(request, response){
	var number = url.parse(request.url,true).query.number;
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + number + " images received.");
	var message = getImgs.getImgs(number, function(dataUrls, code){
		response.setHeader("Access-Control-Allow-Origin", "*");
		if(code == 200) {
			response.writeHead(200, {"Content-Type" : "text/plain"});
			var json = JSON.stringify(dataUrls);
			response.write(json);
			response.end();
		}
		else {
			response.writeHead(code, {"Content-Type" : "text/plain"});
			response.write(dataUrls[0]);
			response.end();
		}
	});
});

var server = app.listen(8080, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("http://127.0.0.1:8080/index.html")
});