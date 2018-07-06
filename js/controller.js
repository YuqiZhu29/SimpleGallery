$(document).ready(function() {
	//get random number from Gallery object;
	var gallery = new Gallery(100, 100, 100);
	generateGallery(gallery);
	fetchThumbnails(gallery);

});

//display gallery on html page random number of placeholder
function generateGallery(gallery) {
	try{
		var thumbnailsNumber = gallery.getNumber();
		var arr = [];
		for(var i = 0; i < thumbnailsNumber; i++) {
			var uuid = gallery.generateUUID();
			var $ph = $("<div id='" + uuid + "' class='placeHolder'><div class='content'><img></div></div>");
			arr.push($ph);
			gallery.placeHolders.push(new PlaceHolder(uuid));
		}
		$(".mainContainer").append(arr);
		$(".placeHolder").height(gallery.getHeight());
		$(".placeHolder").width(gallery.getWidth());
	}catch(error) { 
		console.log(error);
	}
	console.log("Created " + arr.length + " placeholders without thumbnails.");
}

function fetchThumbnails(gallery) {
	console.log("Loading images...");
	$("img").attr("alt", "loading...");
	$.ajax({
		url: "https://jsonplaceholder.typicode.com/photos",
		type: "GET",
		dataType: "json",
		success: function(data){
			console.log("Fetch data success.");
			for(var i = 0; i < gallery.getNumber(); i++) {
				var url = data[i].url;
				gallery.getPlaceHolder(i).setUrl(url);
				//gallery.getPlaceHolder(i).setBase64(url);
				$("#" + gallery.getPlaceHolder(i).getUUID() + "> div > img").attr("src", url);
			}
			$("img").attr("alt", "");
		},
		error: function(XMLHtttpRequest, textStatus, errorThrown) {
			console.log("Thumbnails load failed." + "Error code: " + XMLHtttpRequest.status);
			$("img").attr("alt", "Load failed");
		}
	});
}