var https = require('https');
var base64 = require("./base64");
function getImgs(param, callback) {
	console.log("getImgs was called");
	https.get("https://jsonplaceholder.typicode.com/photos/", function(res){
			var chunks = [];
			var size = 0;
			var dataUrls = [];
			res.on("data", function(chunk){
				chunks.push(chunk);
				size += chunk.length;
			});
			res.on("error", function(err){
				console.log(err.name + " : " + err.message);
				dataUrls[0] = err.message;
				callback(dataUrls, err.code);
			});
			res.on("end", function(){
				var buffer = Buffer.concat(chunks, size);
				var json = JSON.parse(buffer.toString());
				console.log("Urls fetched.")
				for(var i = 0; i < param; i++) {
					if(param > 200)
						sleep(5);
					(function(i) {
						base64.imgToBase64(json[i].thumbnailUrl, function(dataUrl){
							dataUrls.push(dataUrl);
							if(dataUrls.length == param) {
								console.log("Fetched " + dataUrls.length + " images.");
								callback(dataUrls, 200);
							}
						});
					})(i);
				}
			});
	});
}

//when we hit too much get request at once, like over 300, 
//it is impossible to finished on a single machine, 
//so we need this sleep to make them slower
function sleep(delay) {
	var start = (new Date()).getTime();
	while((new Date()).getTime() - start < delay) {
		continue;
	}
}


exports.getImgs = getImgs;