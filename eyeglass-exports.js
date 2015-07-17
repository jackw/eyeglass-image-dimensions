"use strict";

var fs = require("fs");
var path = require("path");
var sizeOf = require('image-size');

module.exports = function(eyeglass, sass) {
	var sassUtils = require("node-sass-utils")(sass);

	function getDimensions(file) {
		return sizeOf(file);
	}

	return {
		sassDir: path.join(__dirname, "sass"),
		functions: {
			"eyeglass-image-width($assetPath)":
			function(assetPath, done) {
				var dimensions = getDimensions(assetPath.getValue());
				var width = new sassUtils.SassDimension(dimensions.width, "px");
				done(sass.types.String(width.sassString()));
			},
			"eyeglass-image-height($assetPath)":
			function(assetPath, done) {
				var dimensions = getDimensions(assetPath.getValue());
				var height = new sassUtils.SassDimension(dimensions.height, "px");
				done(sass.types.String(height.sassString()));
			},
			"eyeglass-image-dimensions($assetPath)":
			function(assetPath, done) {
				var dimensions = getDimensions(assetPath.getValue());
				var width = new sassUtils.SassDimension(dimensions.width, "px");
				var height = new sassUtils.SassDimension(dimensions.height, "px");
				done(sass.types.String(width.sassString() + ' ' + height.sassString()));
			}
		}
	};
};