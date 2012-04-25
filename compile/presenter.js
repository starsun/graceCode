/**
 * @author shandan.com@gmail.com
 * first: download remote files and compress local files into output directory
 * second:  merge files in output directory to a file
 */

var fs = require('fs')
,	path = require('path')
,	url = require('url')
,	download = require("./download")
,	compress = require("./compress")
,	merge = require("./merge")
,	step = require('./lib/step')
,	config = require("./../config")
;


function getMergeList(durlList, iPathList, dir, sourceFile) {
	var mergeList = []
	,	fileName
	,	filePath
	,	downloadDir
	,	localDir
	;
	
	durlList.forEach(function (durl) {
		if (/\.js$/.test(durl.url)) {
			fileName = path.basename(durl.url); //url.parse(durl.url).pathname.split('/').pop();
			filePath = path.join(dir, 'download', fileName);
			mergeList.push(filePath);
		}
	});

	iPathList.forEach(function (iPath) {
		if (/\.js$/.test(iPath.url)) {
			fileName = path.basename(iPath.url).replace('.js', '-min.js');
			filePath = path.join(dir, 'local', fileName);
			mergeList.push(filePath);
		}
	});		
	
	if(sourceFile && sourceFile.url) {
		mergeList.push(sourceFile.url);
	}
	return mergeList;


}

exports.presenterJS = function(fileObj, isStrict) {

	var durlList = fileObj.remoteList
	,	iPathList = fileObj.localList
	,	sourceFile = fileObj.sourceFile
	,	sourceName = path.basename(sourceFile.url)
	,	mergeList = []
	,	tmpDir = config.config.tmpDir
	,	oPath
	;
				
	mergeList = getMergeList(durlList, iPathList, tmpDir, sourceFile);
	oPath = path.join(config.configJS.oDir, sourceName.replace('.js','-min.js'));

	step.Step(
	
		function downloadAndCompress(){
			download.downloadFiles(durlList, sourceName, this.parallel());
			compress.compressFiles(iPathList, sourceName, isStrict, this.parallel());	
		},

		function mergeFiles(dir){
//				console.log(oPath);
			merge.merge(mergeList, oPath);	
		}
	);
};

exports.presenterCSS = function(iPathList, isStrict) {

	var tmpDir = path.join(config.config.tmpDir, 'css')
	,	oPath
	,	mergeList = []
	;

	oPath = config.configCSS.oPath;
	
	step.Step(
		function downloadAndCompress(){
			compress.compressCSSFiles(iPathList, tmpDir, this);	
		},
		
		function mergeFiles(dir){
			
			iPathList.forEach(function (iPath) {
				if (/\.css$/.test(iPath)) {
					filePath = path.join(tmpDir, path.basename(iPath).replace('.css', '-min.css'));
					mergeList.push(filePath);
					
				}
			});	
			merge.merge(mergeList, oPath);	
		}
	);
};
