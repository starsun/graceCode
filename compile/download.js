/**
 * @author shandan.com@gmail.com
 * Function to download file using HTTP.get
 */

var fs = require('fs')
,	http = require('http')
,	url = require('url')
,	path = require('path')
,	step = require('./lib/step')
,	iconv = require('./lib/iconv')
,	config = require("./../config")
,	output = require('./output')
;

/**
 * download file using HTTP.get
 * @param {Object} urlObj url for download  and charset 
 * @param {String} dir directory for download files, make sure it's there
 */
exports.download = function(urlObj, dir, scharset, callback){
	var durl = urlObj.url
	,	charset = urlObj.charset
	,	options = {
			host: url.parse(durl).host,
			port: 80,
			path: url.parse(durl).pathname
		}
	,	fileName = path.basename(durl) //url.parse(durl).pathname.split('/').pop()
	,	file = fs.createWriteStream(path.join(dir,fileName))
	;

	http.get(options, function(res){
		res.on('data', function(data){
			var iCode;
			if (charset == scharset) {
				iCode = data;
			} else {
				iCode = iconv.decode(data, charset);
			}
			file.write(iCode);
		}).on('end', function(){
			file.end();
			console.log('*****loaded: ' + fileName);
			if (callback) {
				callback(dir);
			}
		});
	});	
};

/**
 * download files
 * @param {Array} durlList url list for download
 * @param {String} dir directory for download files, make sure it's there
 */
exports.downloadFiles = function(durlList, sourceName, callback) {
	var i
	,	leng = durlList.length
	,	self = this
	,	dir = path.join(config.config.tmpDir, 'download')
	,	charset = config.configJS.charset
	;
	
	step.Step(
			
		function mkDirAndDownAll() {
			var group = this.group();

			durlList.forEach(function(durl){
				if (durl.url.indexOf('.js') > -1) {
				
					self.download(durl, dir, charset, group());
				}
			});
	
		},
		
		function cb(dir) {
			var outStr = '|    files imported in ' + sourceName + ' are loaded    |';
			output.output(outStr);
			if (callback) {
				callback(dir);
			}
		}
	);
};




