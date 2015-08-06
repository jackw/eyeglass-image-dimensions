"use strict";

var fs = require("fs");
var path = require('path');
var sass = require("node-sass");
var Eyeglass = require("eyeglass").Eyeglass;
var assert = require("assert");


describe("image dimensions module", function () {
  it('gets the dimensions from a relative image path', function (done) {

    var sassInput = "@import 'image-dimensions';" +
            ".img-dim-test { background-size: image-dimensions('images/image-01.png'); }";

    var cssOutput = ".img-dim-test {\n  background-size: 400px 550px; }\n";

    var rootDir = path.join(__dirname, 'assets');

    var eyeglass = new Eyeglass({
      root: rootDir,
      data: sassInput
    }, sass);

    sass.render(eyeglass.sassOptions(), function(error, result) {
      assert(!error, error && error.message);
      assert.equal(cssOutput, result.css.toString());
      done();
    });

  });
});

  // it('gets the image dimensions for an absolute image path', function (done) {
  //   var sassInput = "";
  //   var cssOutput = "";

  //   var eg = new Eyeglass({
  //     root: rootDir,
  //     data: sassInput
  //   }, sass);
  // });

  // it('gets the image dimensions for an asset image path', function (done) {
  //   var sassInput = "";
  //   var cssOutput = "";

  //   var eg = new Eyeglass({
  //     root: rootDir,
  //     data: sassInput
  //   }, sass);
  // });
//});