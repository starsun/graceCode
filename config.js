/**
 * @author shandan.com@gmail.com
 * 全局配置
 */
exports.configJS = {
	jsReg: /ALP.Import\([\'\"]([a-zA-Z_\-0-9\/\.\:]*)\.js[\'\"](,[\'\"][\w-]+[\'\"])*\);/g,
	charset:'utf8',//源文件编码，也作为目标文件的编码
	jsBaseDir:'D:/wwwroot/workspace/20120413_128291_txp-3.5_1/js', //js文件根路径，源文件中引入的其他文件的路径是基于这个路径
	sDir: 'D:/wwwroot/workspace/20120413_128291_txp-3.5_1/js/view',//源文件路径，此路径下的文件都将被编译 
	oDir: 'D:/wwwroot/workspace/20120413_128291_txp-3.5_1/js/min' //编译后的文件存放路径 
};

exports.config = {
	tmpDir: 'D:/wwwroot/git-project/graceCode/tmp' //临时文件存放
}

exports.configCSS = {
	cssReg: /@import url\((.+\.css)\);/g,
	charset:'utf8',//源文件编码，也作为目标文件的编码
	sPath:'D:/wwwroot/workspace/20120413_128291_txp-3.5_1/css/alp.css',//源文件路径 
	oPath:'D:/wwwroot/workspace/20120413_128291_txp-3.5_1/alp-min.css' //,//目标文件路径 
};

exports.staticType = {
	1: 'JS',
	2: 'CSS'
};
