/**
 * @author shandan.com@gmail.com
 * compress a file or files in a dir or files in a list
 */
var fs = require('fs')
,	uglify = require("./uglify")
,	step = require('./lib/step')
,	iconv = require('./lib/iconv')
,	path = require('path')
,	config = require("./../config")
,	cssmin = require('./lib/cssmin')
,	output = require('./output')
;

/**
 * compress a js file
 * @param {String} iPath required input file path
 * @param {String} oPath required output file path
 * @param {String} scharset required charset of project
 * @param {Boolean} isStrict not required parse code strict 
 */
exports.compress = function(iPathObj, oPath, scharset, isStrict, isMangle, callback) {
	var iCode
	,	oCode
	,	ast
	,	fd
	,	bufCode 
	,	charset = iPathObj.charset
	,	iPath = iPathObj.url
	;
	
	try {
		
		if (charset == scharset) {
			iCode = fs.readFileSync(iPath, charset);
		} else {
			bufCode = fs.readFileSync(iPath);
			iCode = iconv.decode(bufCode, charset); //return unicode string from GBK encoded bytes
		}
		oCode = uglify(iCode, {'strict_semicolons':isStrict, 'isMangle':isMangle});
		fd = fs.openSync(oPath, 'w', '0666');
		fs.writeSync(fd, oCode, 0);	
		fs.closeSync(fd);
		console.log('+++++compressed: ' + oPath);
	} catch(err) {
		throw err;
	}
	if (callback) {
		callback(oPath);
	}
};	

/**
 * compress files in a list separately 
 * @param {String} iDir input Dir
 * @param {String} oDir output Dir
 * @param {String} charset
 * @param {Boolean} isStrict
 */
exports.compressFiles = function(iPathList, sourceName, isStrict, callback){
	var self = this
	,	charset = config.configJS.charset
	,	oDir =  config.configJS.tmpDir
	,	oPath
	;

    step.Step(
		function readFiles(){
	        var group = this.group()
			,	oPath	
			;
	        iPathList.forEach(function(iPathObj){
	            if (iPathObj.url.indexOf('.js') > -1) {
					oPath = oDir + "/" + path.basename(iPathObj.url).replace('.js', '-min.js');
	                self.compress(iPathObj, oPath, charset, isStrict, true,group());
	            }
	        });
	    }, 
		
		function cb(oPath){
			var outStr = '|    files imported in ' + sourceName + ' are compressed    |';
			output.output(outStr);
			if(callback) {
				callback(sourceName);
			}
	    }
	);
};


/**
 * compress files in a dir separately 
 * @param {String} iDir input Dir
 * @param {String} oDir output Dir
 * @param {String} charset
 * @param {Boolean} isStrict
 */
exports.compressDir = function(iDir, oDir, charset, isStrict, callback){
	var self = this;
	
	step.Step(
		function readDir(){
	    	fs.readdir(iDir, this);
		}, 
		
		function readFiles(err, files){
			var group = this.group()
			,	iPath
			,	oPath
			,	iCode
			,	oCode
			,	ast
			,	fd
			;
			
		    if (err) throw err;
			
		    files.forEach(function(filename){
		        if (/\.js$/.test(filename)) {
					iPath = iDir + "/" + filename;
					oPath = oDir + "/" + filename.replace('.js', '-min.js');	
					self.compress(iPath, oPath, charset, isStrict, group());
		        }
		    });
		}, 
		
		function cb(oPath){
			if (callback) {
				callback();	
			}
		}
	);	
};


exports.compressCSS = function(iPath, oPath, charset, callback) {
	var iCode
	,	oCode
	,	fd
	,	bufCode 
	;
	
	try {
		iCode = fs.readFileSync(iPath, charset);
		oCode = cssmin.cssmin(iCode);
		fd = fs.openSync(oPath, 'w', '0666');
		fs.writeSync(fd, oCode, 0);	
		fs.closeSync(fd);
		console.log('+++++compressed: ' + oPath);
	} catch(err) {
		throw err;
	}
	if (callback) {
		callback(oPath);
	}	
};

exports.compressCSSFiles = function(iPathList, callback) {
	var self = this
	,	charset = config.configCSS.charset
	,	oDir =  config.configCSS.tmpDir
	,	oPath
	;	
	
    step.Step(
		function readFiles(){
	        var group = this.group()
			,	oPath	
			;
	        iPathList.forEach(function(iPath){
	            if (iPath.indexOf('.css') > -1) {
					oPath = oDir + "/" + path.basename(iPath).replace('.css', '-min.css');
	                self.compressCSS(iPath, oPath, charset, group());
	            }
	        });
	    }, 
		
		function cb(oPath){
			if(callback) {
				callback(oPath);
			}
	    }
	);	
};
