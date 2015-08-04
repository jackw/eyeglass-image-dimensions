"use strict";

var gulp = require("gulp");
var eslint = require("gulp-eslint");
var config = require("eyeglass-dev-eslint");
var mocha = require("gulp-mocha");

gulp.task("test", ["lint"], function() {
	return gulp.src(["test/*.js"], {read: false})
		.pipe(mocha({reporter: "spec"}));
});


gulp.task("lint", function() {
  return gulp.src(["*.js"])
      .pipe(eslint(config))
      .pipe(eslint.formatEach("stylish", process.stderr))
      .pipe(eslint.failOnError());
});

gulp.task("default", ["test"]);
