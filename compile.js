/**
 * @author shandan.com@gmail.com
 * 执行入口 main
 * 
 */
var presenter = require("./compile/presenter")
,	config = require("./config")
,	parsefile = require("./parsefile")
,	step = require('./compile/lib/step')
,	fs = require('fs')
;

function compileJS (sPath, callback) {
	var listObj = parsefile.getJSListObj(sPath);
	presenter.presenterJS(listObj, false);
	if (callback) {
		callback(sPath);
	}
}


function compileJSFiles(){
	var self = this;
	
	step.Step(
		function readDir(){

			fs.readdir(config.configJS.sDir, this);

		}, 
		
		function readFiles(err, files){
			var group = this.group()
			,	iPath
			,	oPath
			,	iCode
			,	oCode
			,	ast
			,	fd
			,	sPath
			;
			
		    if (err) throw err;
			
		    files.forEach(function(filename){
				
		        if (/\.js$/.test(filename)) {	
					sPath = config.configJS.sDir + "/" + filename;
					oPath = config.configJS.oDir + "/" + filename.replace('.js', '-min.js');	
					compileJS(sPath, group());
		        }
		    });
		}, 
		
		function cb(sPath){
//			console.log('--------compile all files--------');
		}
	);		
}

function compileCSSFiles(){
	var contents ;
	var listObj = parsefile.getCSSListObj();
	presenter.presenterCSS(listObj, false);	
}


function main(){
	console.log('\nYour platform is ' + process.platform);
	console.log('\n请输入数字选择要合并的文件类型\n');
	console.log('1.JS 2.CSS');
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	
	process.stdin.on('data', function(staticType){
	
		var staticType = parseInt(staticType, 10);
		if (staticType === 1) {
			compileJSFiles();
		} else if (staticType === 2) {
			compileCSSFiles();
		} else {
			console.log('\n选择类型不存在\n');
		}
		process.stdin.pause();
		return;
	
	});
	
}

main();














