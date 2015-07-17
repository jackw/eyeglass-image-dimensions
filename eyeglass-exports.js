"use strict";

var fs = require("fs");
var path = require("path");
var sizeOf = require('image-size');

module.exports = function(eyeglass, sass) {
	var sassUtils = require("node-sass-utils")(sass);

	function getDimensions(file) {
		var dimensions = sizeOf(file);
		return {
			height: new sassUtils.SassDimension(dimensions.height, "px"),
			width: new sassUtils.SassDimension(dimensions.width, "px")
		};
	}

	return {
		sassDir: path.join(__dirname, "sass"),
		functions: {
			"eyeglass-image-width($assetPath)":
			function(assetPath, done) {
				var dimensions = getDimensions(assetPath.getValue());
				done(sass.types.String(dimensions.width.sassString()));
			},
			"eyeglass-image-height($assetPath)":
			function(assetPath, done) {
				var dimensions = getDimensions(assetPath.getValue());
				done(sass.types.String(dimensions.height.sassString()));
			},
			"eyeglass-image-dimensions($assetPath)":
			function(assetPath, done) {
				var dimensions = getDimensions(assetPath.getValue());
				done(sass.types.String(dimensions.width.sassString() + ' ' + dimensions.height.sassString()));
			}
		}
	};
};