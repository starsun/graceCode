/**
 * @author shandan.com@gmail.com
 * parse source file
 * the code for each product maybe different 
 */

var fs = require('fs')
,	compress = require("./compile/compress")
,	step = require('./compile/lib/step')
,	config = require("./config")
;

exports.getJSListObj = function(iPath){

	var fileName = iPath.split('/').pop()
	,	reg = config.configJS.jsReg
	,	oDir = config.configJS.tmpDir
	,	jsBaseDir = config.configJS.jsBaseDir
	,	oPath = oDir + '/' + fileName
	,	iCode = ''
	,	list = []
	,	remoteList = []
	,	localList = []
	,	i = 0
	,	leng = 0
	,	index = 0
	,	tmpStr = ''
	,	tmpList = []
	,	tmpObj = {}
	,	listObj = {}
	,	charset = config.configJS.charset
	,	iPathObj = {'url':iPath, 'charset': charset}
	;
	
	
	step.Step(
		function compressFile(){
			var sourceName = iPathObj.url.split('/').pop();
			compress.compress(iPathObj, oPath, charset, false, false, this);
		},
		function parseFile(oPath){

			iCode = fs.readFileSync(oPath, charset);
			list = iCode.match(reg);
			leng = (list ? list.length:0);
		
			if(leng > 0) {
				index = list[0].indexOf('(')+1;
			}
			
			for(i = 0; i < leng; i++) {
				tmpStr = list[i].substring(index, list[i].length-2).replace(/['"]/g, '');
				
				tmpList = tmpStr.split(',');
				tmpObj = {
					'url': tmpList[0],
					'charset': (tmpList[1]?tmpList[1]:'utf8')
				};
				if(tmpList[0].indexOf('http') === 0) {
					remoteList.push(tmpObj);
				} else {
					tmpObj.url = jsBaseDir + '/' + tmpObj.url;
					localList.push(tmpObj);
				}
			}
			
			//源文件的处理
			iCode = iCode.replace(reg, '');
			var fd = fs.openSync(oPath, 'w', '0666');
			fs.writeSync(fd, iCode, 0);	
			fs.closeSync(fd);
			tmpObj = {
				'url': oPath,
				'charset': charset
			};
			
			listObj =  {'remoteList': remoteList, 'localList': localList, 'sourceFile':tmpObj};	
		}
	);
	
	return listObj;
};

exports.getCSSListObj = function(){
	var iPath = config.configCSS.sPath
	,	fileName = iPath.split('/').pop()
	,	reg = config.configCSS.cssReg
	,	charset = config.configCSS.charset
	,	oDir = config.configCSS.tmpDir
	,	cssBaseDir = config.configCSS.cssBaseDir
	,	iCode = ''
	,	list = []
	,	leng = 0
	,	index = 0
	,	i = 0
	,	tmpStr = ''
	,	remoteList = []
	,	localList = []
	,	listObj = {}
	;
	

	iCode = fs.readFileSync(iPath, charset);
	list = iCode.match(reg);
	leng = (list ? list.length:0);

	if(leng > 0) {
		index = list[0].indexOf('(')+1;
	}
			
	for(i = 0; i < leng; i++) {
		tmpStr = list[i].substring(index, list[i].length-2).replace(/['"]/g, '');
		tmpStr = cssBaseDir + '/' + tmpStr;
		localList.push(tmpStr);
	}
			
	return 	localList;
};