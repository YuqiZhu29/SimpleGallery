$(document).ready(function() {
	//get random number from Gallery object;
	var gallery = new Gallery(1000);
	displayGallery(gallery);
	fetchThumbnails(gallery);
});

//display gallery on html page random number of placeholder
function displayGallery(gallery) {
	try{
		var thumbnailsNumber = gallery.getNumber();
		var arr = [];
		for(var i = 0; i < thumbnailsNumber; i++) {
			var $ph = $("<div id='ph" + (i+1) + "' class='placeHolder'><div class='content'><img></div></div>");
			arr.push($ph);
		}
		$(".mainContainer").append(arr);
		$(".placeHolder").height(gallery.getHeight());
		$(".placeHolder").width(gallery.getWidth());
	}catch(error) { 
		console.log(error);
	}
	console.log("Created " + arr.length + " without thumbnails.");
	return arr;
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
			for(var i = 0; i <= gallery.getNumber(); i++) {
				$("#ph" + i + "> div > img").attr("src", data[i].url);
			}
			$("img").attr("alt", "");
		},
		error: function(XMLHtttpRequest, textStatus, errorThrown) {
			alert("Error! code: " + XMLHtttpRequest.status);
		}
	});
}