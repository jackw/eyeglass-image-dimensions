"use strict";

var sizeOf = require('image-size');

var ImageDimensions = function(filename) {
	console.log(filename);
};

ImageDimensions.prototype.imageWidth = function(imageFile) {
	console.log(imageFile);
};

ImageDimensions.prototype.imageHeight = function(imageFile) {
	console.log(imageFile);
};

ImageDimensions.prototype.imageDimensions = function(imageFile) {
	console.log(imageFile);
};

module.exports = ImageDimensions;