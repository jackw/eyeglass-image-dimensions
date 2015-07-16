"use strict";

var path = require("path");
var imageDimensions = require("./ImageDimensions");

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