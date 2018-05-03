class Gallery{
	constructor(number) {
		//get random number of thumbnails, ps: from 1 to number
		this.number = Math.floor(Math.random() * number + 1);
		this.width = 200;
		this.height = 200;
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
}

class PlaceHolder{
	constructor(id, height, width) {
		this.width = width;
		this.height = height;
		this.id = id;
		this.url = "/w3images/cars1.jpg";
	}
	setUrl(url) {
		this.url = url;
	}
}