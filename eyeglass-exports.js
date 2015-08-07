"use strict";

var fs = require("fs");
var path = require("path");
var sizeOf = require("image-size");
var Promise = require("promise");

module.exports = function(eyeglass, sass) {
  var sassUtils = require("node-sass-utils")(sass);

  /**
   * ImageDimensions constructor.
   * @param {String}    assetPath         the file path from sass
   * @param {Map}       registeredAssets  registered assets from sass
   * @param {Function}  callback          callback function to deliver results
   */
  function ImageDimensions (assetPath, registeredAssets, callback) {
    sassUtils.assertType(assetPath, "string");
    sassUtils.assertType(registeredAssets, "map");

    var self = this;

    var getPath = self.checkImagePath(assetPath.getValue(), registeredAssets);
    getPath.then(function (success) {

      var imageDimensions = self.getDimensions(success);

      imageDimensions.then(function (dimensions) {
        callback(null, dimensions);
      }, function (err) {
        callback(err, null);
      });

    }, function (err) {
      callback(err, null);
    });
  }

  /**
   * Given the path to an image, return it's dimensions.
   * @param  {String} assetPath the file path
   * @return {Object}           error or image dimensions
   */
  ImageDimensions.prototype.getDimensions = function (assetPath) {
    return new Promise(function (resolve, reject) {

      sizeOf(assetPath, function (err, dimensions) {

        if (err) {
          return reject(err);
        }

        return resolve({
          height: new sassUtils.SassDimension(dimensions.height, "px"),
          width: new sassUtils.SassDimension(dimensions.width, "px")
        });
      });

    });
  };

  /**
   * Given the path to an image, check it exists including in assets.
   * @param  {String} assetPath     The original path from sass
   * @param  {Map} registeredAssets The assets from sass
   * @return {String | Object}      Either the path or the error object
   */
  ImageDimensions.prototype.checkImagePath = function(assetPath, registeredAssets) {

    registeredAssets = sassUtils.castToJs(registeredAssets);

    return new Promise(function (resolve, reject) {

      // Given an absolute path make sure we're looking in the right location.
      if (path.isAbsolute(assetPath)) {
        assetPath = path.join(eyeglass.options.root, assetPath);
      }

      fs.lstat(assetPath, function(err, stats) {

        if (err) {
          // can"t find file from path provided so check assets
          if (err.code === "ENOENT") {
            // loop assets and check for a matching file.
            registeredAssets.forEach(function(asset) {
              asset = sassUtils.castToJs(asset);
              var assetData = asset.coerce.get(assetPath);

              if (assetData) {
                return resolve(assetData.coerce.get("filepath"));
              }

            });
          }

          return reject(err);
        }

        return resolve(assetPath);
      });

    });

  };

  return {
    sassDir: path.join(__dirname, "sass"),
    functions: {
      "eg-image-width($assetPath, $registeredAssets)":
      function(assetPath, registeredAssets, done) {

        var imageDim = new ImageDimensions(assetPath, registeredAssets, function(err, dimensions) {
          if (err) {
            done(sass.types.Error(err.message));
          }
          done(sassUtils.castToSass(dimensions.width));
        });

      },
      "eg-image-height($assetPath, $registeredAssets)":
      function(assetPath, registeredAssets, done) {

        var imageDim = new ImageDimensions(assetPath, registeredAssets, function(err, dimensions) {
          if (err) {
            done(sass.types.Error(err.message));
          }
          done(sassUtils.castToSass(dimensions.height));
        });

      },
      "eg-image-dimensions($assetPath, $registeredAssets)":
      function(assetPath, registeredAssets, done) {

        var imageDim = new ImageDimensions(assetPath, registeredAssets, function(err, dimensions) {
          if (err) {
            done(sass.types.Error(err.message));
          }
          dimensions = sassUtils.castToSass([dimensions.width, dimensions.height]);
          dimensions.setSeparator(false);

          done(dimensions);
        });

      }
    }
  };

};
