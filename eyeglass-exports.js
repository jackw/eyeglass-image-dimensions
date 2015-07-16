"use strict";

var fs = require("fs");
var path = require("path");
var sizeOf = require('image-size');

module.exports = function(eyeglass, sass) {
	return {
		sassDir: path.join(__dirname, "sass"),
		functions: {
			"eyeglass-image-width($assetPath)":
			function(assetPath, done) {
				done(sass.types.String('"image width is ' + assetPath.getValue() + '"'));
			},
			"eyeglass-image-height($assetPath)":
			function(assetPath, done) {
				done(sass.types.String('"image height is ' + assetPath.getValue() + '"'));
			},
			"eyeglass-image-dimensions($assetPath)":
			function(assetPath, done) {
				done(sass.types.String('"image dimensions are ' + assetPath.getValue() + '"'));
			}
		}
	};
};