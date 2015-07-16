"use strict";

var path = require("path");
var imageSize = require("ImageSize.js");

module.exports = function(eyeglass, sass) {
  return {
    sassDir: path.join(__dirname, "sass"),
    functions: {
      "eyeglassImageSize($assetPath)":
      function(assetPath, done) {
        done(sass.types.String('"image path is ' + assetPath.getValue() + '"'));
      }
    }
  };
};