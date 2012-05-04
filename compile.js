/**
 * @author shandan.com@gmail.com
 * 执行入口 main
 * 执行方式
 * node compile.js 
 * node compile.js -t 1
 * node compile.js -t js
 * node compile.js -t JS
 * 
 */
var presenter = require("./compile/presenter")
,	config = require("./config")
,	parsefile = require("./parsefile")
,	step = require('./compile/lib/step')
,	fs = require('fs')
,	path = require('path')
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
					sPath = path.join(config.configJS.sDir, filename);
					oPath = path.join(config.configJS.oDir, filename.replace('.js', '-min.js'));	
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

function mkTmpDir(dir) {
	var localDir
	,	downloadDir
	,	cssDir
	;
	if (!path.existsSync(dir)) {
		fs.mkdirSync(dir, 0755);
	}	
	
	localDir = path.join(dir, 'local');
	downloadDir = path.join(dir, 'download');
	cssDir = path.join(dir, 'css');
	
	if (!path.existsSync(localDir)) {
		fs.mkdirSync(localDir, 0755);
	}			
	if (!path.existsSync(downloadDir)) {
		fs.mkdirSync(downloadDir, 0755);
	}
	if (!path.existsSync(cssDir)) {
		fs.mkdirSync(cssDir, 0755);
	}	
	
}

function consoleProcess(){
	
	console.log('\n请输入数字选择要合并的文件类型\n');
	console.log('1.JS 2.CSS');
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	
	process.stdin.on('data', function(staticType){
		var tmpDir = config.config.tmpDir;
		
		mkTmpDir(tmpDir);
		
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

function main(){
	console.log('\nYour platform is ' + process.platform);
	
	var staticType
	,	index = process.argv.indexOf('-t')
	;
	if (index != -1 && process.argv[index + 1]) {
		staticType = process.argv[index + 1].toUpperCase();
		
		if (staticType === '1' || staticType === 'JS') {
			compileJSFiles();
		} else if (staticType === '2' || staticType === 'CSS') {
			compileCSSFiles();
		} else {
			console.log('\n 输入的-t参数类型不存在\n');
			consoleProcess();
		}
	} else {
		consoleProcess();
	}	
}

main();














