"use strict";

var fs = require("fs");
var path = require('path');
var sass = require("node-sass");
var Eyeglass = require("eyeglass").Eyeglass;
var assert = require("assert");


describe("image dimensions module", function () {
  it('gets the dimensions from a relative image path', function (done) {

    var sassInput = "@import 'image-dimensions';" +
            ".img-dim-test { background-size: image-dimensions('test/assets/images/image-01.png');" +
            "background-height: image-height('test/assets/images/image-01.png');" +
            "background-width: image-width('test/assets/images/image-01.png'); }";

    var cssOutput = ".img-dim-test {\n  background-size: 400px 550px;\n" +
                    "  background-height: 550px;\n" +
                    "  background-width: 400px; }\n";

    var eyeglass = new Eyeglass({
      root: path.join(__dirname, 'assets'),
      data: sassInput
    }, sass);

    sass.render(eyeglass.sassOptions(), function(error, result) {
      // console.log(result.css.toString());
      assert(!error, error && error.message);
      assert.equal(cssOutput, result.css.toString());
      done();
    });

  });

  it('gets the dimensions from an absolute image path', function (done) {

    var sassInput = "@import 'image-dimensions';" +
            ".img-dim-test { background-size: image-dimensions('/images/image-02.jpg');" +
            "background-height: image-height('/images/image-02.jpg');" +
            "background-width: image-width('/images/image-02.jpg'); }";

    var cssOutput = ".img-dim-test {\n  background-size: 150px 300px;\n" +
                    "  background-height: 300px;\n" +
                    "  background-width: 150px; }\n";

    var eyeglass = new Eyeglass({
      root: path.join(__dirname, 'assets'),
      data: sassInput
    }, sass);

    sass.render(eyeglass.sassOptions(), function(error, result) {
      assert(!error, error && error.message);
      assert.equal(cssOutput, result.css.toString());
      done();
    });

  });

  it('gets the dimensions from an app asset image path', function (done) {

    var sassInput = "@import 'assets'; @import 'image-dimensions';" +
            ".img-dim-test { background-size: image-dimensions('image-03.gif');" +
            "background-height: image-height('image-03.gif');" +
            "background-width: image-width('image-03.gif'); }";

    var cssOutput = ".img-dim-test {\n  background-size: 190px 190px;\n" +
                    "  background-height: 190px;\n" +
                    "  background-width: 190px; }\n";

    var rootDir = path.join(__dirname, 'assets');

    var eyeglass = new Eyeglass({
      root: rootDir,
      data: sassInput
    }, sass);

    eyeglass.assets.addSource(path.join(rootDir, 'images'));

    sass.render(eyeglass.sassOptions(), function(error, result) {
      assert(!error, error && error.message);
      assert.equal(cssOutput, result.css.toString());
      done();
    });

  });



});
