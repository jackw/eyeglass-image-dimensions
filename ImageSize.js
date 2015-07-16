"use strict";

var sizeOf = require('image-size');

var ImageSize = function(filename) {
	console.log(filename);
};

ImageSize.prototype.imageWidth = function(imageFile) {
	console.log(imageFile);
};

ImageSize.prototype.imageHeight = function(imageFile) {
	console.log(imageFile);
};

ImageSize.prototype.imageDimensions = function(imageFile) {
	console.log(imageFile);
};

module.exports = ImageSize;