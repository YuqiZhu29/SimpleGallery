var http = require('http');
function imgToBase64(url, callback) {
	http.get(url, function(res) {
		var chunks = [];
		var size = 0;
		res.on('data', function(chunk){
			chunks.push(chunk);
			size += chunk.length;
		});
		res.on('error', function(err){
			console.log("Problem with request: " + err.message);
		});
		res.on('end', function(){
			var data = Buffer.concat(chunks, size);
			var base64Img = data.toString('base64');
			base64Img = "data:image/png;base64," + base64Img;
			callback(base64Img);
		});
	});
}
module.exports.imgToBase64 = imgToBase64;
