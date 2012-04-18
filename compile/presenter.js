/**
 * @author shandan.com@gmail.com
 * first: download remote files and compress local files into output directory
 * second:  merge files in output directory to a file
 */

var download = require("./download")
,	compress = require("./compress")
,	merge = require("./merge")
,	step = require('./lib/step')
,	url = require('url')
,	path = require('path')
,	config = require("./../config")
;

function getMergeList(durlList, iPathList, dir, sourceFile) {
	var mergeList = []
	,	fileName
	,	filePath
	;
	
	durlList.forEach(function (durl) {
		if (/\.js$/.test(durl.url)) {
			fileName = url.parse(durl.url).pathname.split('/').pop();
			filePath = dir + "/" + fileName;
			mergeList.push(filePath);
		}
	});

	iPathList.forEach(function (iPath) {
		if (/\.js$/.test(iPath.url)) {
			filePath = dir + "/" + path.basename(iPath.url).replace('.js', '-min.js');
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
	,	sourceName = sourceFile.url.split('/').pop()
	,	mergeList = []
	,	dir = config.configJS.tmpDir
	,	oPath
	;
	mergeList = getMergeList(durlList, iPathList, dir, sourceFile);
	oPath = config.configJS.oDir + '/' + sourceName.replace('.js','-min.js');
	
		step.Step(
			function downloadAndCompress(){
				download.downloadFiles(durlList, sourceName, this.parallel());
				compress.compressFiles(iPathList, sourceName, isStrict, this.parallel());	
			},
			
			function mergeFiles(dir){
				merge.merge(mergeList, oPath);	
			}
		);
};

exports.presenterCSS = function(iPathList, isStrict) {

	var tmpDir = config.configCSS.tmpDir
	,	oPath
	,	mergeList = []
	;

	oPath = config.configCSS.oPath;
	
	step.Step(
		function downloadAndCompress(){
			compress.compressCSSFiles(iPathList, this);	
		},
		
		function mergeFiles(dir){
			
			iPathList.forEach(function (iPath) {
				if (/\.css$/.test(iPath)) {
					filePath = tmpDir + "/" + path.basename(iPath).replace('.css', '-min.css');
					mergeList.push(filePath);
					
				}
			});	
			merge.merge(mergeList, oPath);	
		}
	);
};
