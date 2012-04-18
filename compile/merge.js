/**
 * @author shandan.com@gmail.com
 *  merge files
 */

var fs = require('fs')
,	step = require('./lib/step')
,	output = require('./output')
;

/**
 * merge files to one file
 * @param {String} iPath required input file path
 * @param {String} oPath required output file path
 */
exports.merge = function(iPathList, oPath) {
	
    step.Step(
		function readFiles(){
	        var group = this.group();
	        iPathList.forEach(function(iPath){
				console.log('=====merged: ' + iPath);
                fs.readFile(iPath, group());
	        });
	    }, 
		
		function showAll(err, files){
	        if (err) throw err;
			var oCode = files.join('')
			,	fd = fs.openSync(oPath, 'w', '0666')
			,	fileName = oPath.split('/').pop()
			,	outStr = ''
			;
			
			fs.writeSync(fd, oCode, 0);	
			fs.closeSync(fd);
			outStr = '|    files imported in ' + fileName.replace('-min.', '.') + ' are merged    |';
			output.output(outStr);
	    }
	);
};	




	