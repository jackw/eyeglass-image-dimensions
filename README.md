# eyeglass-image-dimensions
An eyeglass module that provides LibSass the same image dimensions functionality found in ruby compass.

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
