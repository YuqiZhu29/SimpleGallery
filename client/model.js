class Gallery{
	constructor(upBound, width, height) {
		//get random number of thumbnails, ps: from 1 to upBound
		this.number = Math.floor(Math.random() * upBound + 1);
		//jsonplaceholder only contains 5000 items
		this.number = this.number > 5000 ? 5000 : this.number;
		this.width = width;
		this.height = height;
		this.placeHolders = new Map();
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
	getPlaceHolders() {
		return this.placeHolders;
	}
	getPlaceHolder(key) {
		return this.placeHolders.get(key);
	}
	generateUUID(){
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
	    });
	    return uuid;
	}
	generatePlaceHolders() {
		console.log("Generate " + this.number + " placeholders without thumbnails.");
		for(var i = 0; i < this.number; i++) {
			var uuid = this.generateUUID();
			this.placeHolders.set(uuid, new PlaceHolder(uuid));
		}
	}
}

class PlaceHolder{
	constructor(uuid) {
		this.uuid = uuid;
		this.status = "Created";
		this.base64 = ""; 
	}
	setStatus(status) {
		this.status = status;
	}
	getStatus() {
		return this.status;
	}
	getUUID() {
		return this.uuid;
	}
	setBase64(base64) {
		this.base64 = base64;
	}
	getBase64() {
		return this.base64;
	}
}
