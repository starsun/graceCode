##graceCode --- a JavaScript add CSS compiler/minifier

This package implements a JavaScript and CSS compiler/minifier toolkit.  It is developed on [NodeJS](http://nodejs.org/).

The JS parser is implemented in [parse-js.js](https://github.com/starsun/UglifyJS).

The CSS minifier is implemented in [cssmin.js](https://github.com/fczuardi/yuicompressor/blob/master/ports/js/cssmin.js), which is a JS implementation of YUI Compressor.

##How to use
<pre>
$git clone git://github.com/starsun/graceCode.git
$cd graceCode
$node compile.js
</pre>