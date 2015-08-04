"use strict";

var fs = require("fs");
var path = require("path");
var sizeOf = require("image-size");
var Promise = require("promise");

module.exports = function(eyeglass, sass) {
  var sassUtils = require("node-sass-utils")(sass);

  function getDimensions(file) {

    return new Promise(function (resolve, reject) {

      sizeOf(file, function (err, dimensions) {

        if (err) {
          return reject(err);
        }

        return resolve({
          height: new sassUtils.SassDimension(dimensions.height, "px"),
          width: new sassUtils.SassDimension(dimensions.width, "px")
        });
      });

    });

  }


  function checkImagePath(file, registeredAssets) {

    registeredAssets = sassUtils.castToJs(registeredAssets);

    return new Promise(function (resolve, reject) {

      fs.lstat(file, function(err, stats) {

        if (err) {
          // can"t find file from path provided so check assets
          if (err.code === "ENOENT") {
            // loop assets and check for a matching file.
            registeredAssets.forEach(function(asset) {
              asset = sassUtils.castToJs(asset);
              var assetData = asset.coerce.get(file);

              if (assetData) {
                return resolve(assetData.coerce.get("filepath"));
              }

            });
          }

          return reject(err);
        }

        return resolve(file);
      });

    });
  }

  return {
    sassDir: path.join(__dirname, "sass"),
    functions: {
      "eg-image-width($assetPath, $registeredAssets)":
      function(assetPath, registeredAssets, done) {

        sassUtils.assertType(assetPath, "string");
        sassUtils.assertType(registeredAssets, "map");

        assetPath = assetPath.getValue();

        var imageInfo = checkImagePath(assetPath, registeredAssets);

        imageInfo.then(function (success) {
          var imageDimensions = getDimensions(success);

          imageDimensions.then(function (dimensions) {
            done(sassUtils.castToSass(dimensions.width));
          }, function (err) {
            done(sass.types.Error(err.message));
          });

        }, function (err) {
          done(sass.types.Error(err.message));
        });

      },
      "eg-image-height($assetPath, $registeredAssets)":
      function(assetPath, registeredAssets, done) {

        sassUtils.assertType(assetPath, "string");
        sassUtils.assertType(registeredAssets, "map");

        assetPath = assetPath.getValue();

        var imageInfo = checkImagePath(assetPath, registeredAssets);

        imageInfo.then(function (success) {
          var imageDimensions = getDimensions(success);

          imageDimensions.then(function (dimensions) {
            done(sassUtils.castToSass(dimensions.height));
          }, function (err) {
            done(sass.types.Error(err.message));
          });

        }, function (err) {
          done(sass.types.Error(err.message));
        });

      },
      "eg-image-dimensions($assetPath, $registeredAssets)":
      function(assetPath, registeredAssets, done) {

        sassUtils.assertType(assetPath, "string");
        sassUtils.assertType(registeredAssets, "map");

        assetPath = assetPath.getValue();

        var imageInfo = checkImagePath(assetPath, registeredAssets);

        imageInfo.then(function (success) {
          var imageDimensions = getDimensions(success);

          imageDimensions.then(function (dimensions) {
            dimensions = [dimensions.width, dimensions.height];
            dimensions = sassUtils.castToSass(dimensions);
            dimensions.setSeparator(false);

            done(dimensions);
          }, function (err) {
            done(sass.types.Error(err.message));
          });

        }, function (err) {
          done(sass.types.Error(err.message));
        });
      }
    }
  };
};
