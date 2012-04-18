/**
 * @author shandan.com@gmail.com
 * 全局配置
 */
exports.configJS = {
	jsReg: /ALP.Import\([\'\"]([a-zA-Z_\-0-9\/\.\:]*)\.js[\'\"](,[\'\"][\w-]+[\'\"])*\);/g,
	charset:'utf8',//源文件编码，也作为目标文件的编码
	jsBaseDir:'D:/wwwroot/workspace/20120315_120413_alsj-3.3_2/js', //js文件根路径，源文件中引入的其他文件的路径是基于这个路径
	sDir: 'D:/wwwroot/workspace/20120315_120413_alsj-3.3_2/js/viewtest',//源文件路径，此路径下的文件都将被编译 
	oDir: 'D:/wwwroot/workspace/20120315_120413_alsj-3.3_2/js/min', //编译后的文件存放路径 
	tmpDir: 'D:/wwwroot/git-project/staticGrace/tmp' //临时文件存放
};

exports.configCSS = {
	cssReg: /@import url\(([a-zA-Z_\-0-9\/]*)\.css\);/g,
	charset:'utf8',//源文件编码，也作为目标文件的编码
	cssBaseDir:'D:/wwwroot/workspace/20120315_120413_alsj-3.3_2/css',
	sPath:'D:/wwwroot/workspace/20120315_120413_alsj-3.3_2/css/alp.css',
	oPath:'D:/wwwroot/workspace/20120315_120413_alsj-3.3_2/css/min/alp-min.css',
	tmpDir: 'D:/wwwroot/git-project/staticGrace/tmp' //临时文件存放
};
exports.staticType = {
	1: 'JS',
	2: 'CSS'
};
