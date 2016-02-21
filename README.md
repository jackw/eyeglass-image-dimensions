[![Build Status](https://travis-ci.org/jackw/eyeglass-image-dimensions.svg?branch=develop)](https://travis-ci.org/jackw/eyeglass-image-dimensions)
[![NPM Downloads](https://img.shields.io/npm/dm/eyeglass-image-dimensions.svg)](http://npm-stat.com/charts.html?package=eyeglass-image-dimensions&author=&from=&to=)
[![devDependency Status](https://david-dm.org/jackw/eyeglass-image-dimensions/dev-status.svg)](https://david-dm.org/jackw/eyeglass-image-dimensions#info=devDependencies)
# eyeglass-image-dimensions
An eyeglass module to give LibSass the same image dimension functionality found in ruby compass.

## Setup

To use image dimensions first install eyeglass then eyeglass-image-dimensions:


	npm install eyeglass --save-dev
	npm install eyeglass-image-dimensions --save-dev


Then add the following to your sass file/s:

```
@import 'image-dimensions';
```

## Usage

### image-width
returns the width of the image in pixels.

```
width: image-width($image);
```

### image-height
returns the height of the image in pixels.

```
height: image-height($image);
```


### image-dimensions
returns a space separated list consisting of the width and height of an image in pixels.

```
background-size: image-dimensions($image);
```
