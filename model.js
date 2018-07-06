class Gallery{
	constructor(upBound, width, height) {
		//get random number of thumbnails, ps: from 1 to upBound
		this.number = Math.floor(Math.random() * upBound + 1);
		this.width = width;
		this.height = height;
		this.placeHolders = [];
		console.log("Create Gallery.");
	}
	getNumber() {
		return this.number;
	}
	getWidth() {
		return this.width;
	}
	getHeight() {
		return this.height;
	}
	getPlaceHolder(index) {
		return this.placeHolders[index];
	}
	generateUUID(){
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	    });
	    return uuid;
	};
}

class PlaceHolder{
	constructor(uuid) {
		this.uuid = uuid;
	}
	getUUID() {
		return this.uuid;
	}
	setUrl(url) {
		this.url = url;
	}
	getUrl() {
		return this.url;
	}
	setBase64(url) {
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		var img = new Image();
		var base64 = '';//base64 d
		img.crossOrigin = "Anonymous";
		img.src = url;
		img.onload = function(){
		   ctx.drawImage(img,0,0);    
		   base64 = canvas.toDataURL(); 
		};
		this.base64 = base64;
	}
	getBase64() {
		return this.base64;
	}
}