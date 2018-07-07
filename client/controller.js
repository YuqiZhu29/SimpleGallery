$(document).ready(function() {
	//get random number from Gallery object;
	var gallery = new Gallery(100, 300, 200);
	gallery.generatePlaceHolders();
	generateGallery(gallery);
	loadImgData(gallery);
	$("#btn").click(function(){
		refresh(gallery);
	});
	$(".placeHolder").click(function(){
		sendPost(this, gallery);
	});
});

//display gallery on html page random number of placeholder
function generateGallery(gallery) {
	try{
		var number = gallery.getNumber();
		var arr = [];
		for(var eachPh of gallery.getPlaceHolders()) {
			var uuid = eachPh[0];
			var $ph = $("<div id='" + uuid + "' class='placeHolder'><div class='content'><img></div><div><span></span></div></div>");
			arr.push($ph);
		}
		$(".mainContainer").append(arr);
		$(".placeHolder").height(gallery.getHeight() + 30);
		$(".placeHolder").width(gallery.getWidth());
	}catch(error) { 
		console.log(error);
	}
	$("img").attr("alt", "Thumbnail");
	updateAllPlaceholders(gallery);
}

//load imgs data, and update objects and DOM elements
function loadImgData(gallery) {
	$("span").text("Loading");
	$("img").css({"border": "none"});
	console.log("Loading images.");
	$.ajax({
		url: "http://127.0.0.1:8080/fetch_imgs",
		type: "GET",
		dataType: "json",
		data: {
			number: gallery.getNumber()
		},
		success: function(data) {
			console.log("Load image data success.");
			var i = 0;
			for(var eachPh of gallery.getPlaceHolders()) {
				eachPh[1].setBase64(data[i++]);
				eachPh[1].setStatus("Loaded");
			}
			updateAllPlaceholders(gallery);
		},
		error: function(XMLHtttpRequest, textStatus, errorThrown) {
			console.log("Thumbnails load failed." + " Error code: " + XMLHtttpRequest.status);
			for(var eachPh of gallery.getPlaceHolders()) {
				eachPh[1].setStatus("Load failed");
				updatePlaceholder(eachPh[0], gallery);
			}
		}
	});
}

//update all placeholders of DOM based on placeholder object, including status and imgs
function updateAllPlaceholders(gallery) {
	for(var eachPh of gallery.getPlaceHolders()) {
		updatePlaceholder(eachPh[0], gallery);
	}
}

//update a single placeholder of DOM based on its placeholder object
function updatePlaceholder(uuid, gallery) {
	var DOMPhImg = $("#" + uuid + "> div > img");
	var DOMPhSpan = $("#" + uuid + "> div > span");
	var ph = gallery.getPlaceHolder(uuid);
	DOMPhImg.attr("src", ph.getBase64());
	DOMPhSpan.text(ph.getStatus());
	if(ph.getStatus() == "Send success")
		DOMPhImg.css({"border": "solid", "border-color": "green"});
	else if(ph.getStatus() == "Send failed")
		DOMPhImg.css({"border": "solid", "border-color": "red"});
	else 
		DOMPhImg.css({"border" : "none"});
}

//when click single image, sent post request with its UUID
function sendPost(DOMPlaceHolder, gallery) {
	var uuid = DOMPlaceHolder.id;
	$.ajax({
		url: "https://jsonplaceholder.typicode.com/posts",
		type: "POST",
		data: {
			UUID : uuid
		},
		success: function() {
			gallery.getPlaceHolder(uuid).setStatus("Send success");
			updatePlaceholder(uuid, gallery);
			console.log("Thumbnail: " + uuid + " send success.")
		},
		error: function(XMLHtttpRequest, textStatus, errorThrown) {
			gallery.getPlaceHolder(uuid).setStatus("Send failed");
			updatePlaceholder(uuid, gallery);
			console.error("Thumbnail: " + uuid + " send failed.");
		}
	});
}

//refresh the page
function refresh(gallery) {
	for(var eachPh of gallery.getPlaceHolders()) {
		if(eachPh[1].getBase64() != "")
			eachPh[1].setStatus("Loaded");
		else
			eachPh[1].setStatus("Load failed");
	}
	updateAllPlaceholders(gallery);
	console.log("Page refreshed.")
}

