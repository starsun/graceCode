/**
 * @author shandan.com@gmail.com
 * 全局配置
 */
exports.configJS = {
	jsReg: /ALP.Import\([\'\"]([a-zA-Z_\-0-9\/\.\:]*)\.js[\'\"](,[\'\"][\w-]+[\'\"])*\);/g,
	charset:'utf8',//源文件编码，也作为目标文件的编码
	jsBaseDir:'/home/workspace/js', //js文件根路径，源文件中引入的其他文件的路径是基于这个路径
	sDir: '/home/workspace/js/view',//源文件路径，此路径下的文件都将被编译 
	oDir: '/home/workspace/js/min', //编译后的文件存放路径 
	tmpDir: '/home/git-project/graceCode/tmp' //临时文件存放
};

exports.configCSS = {
	cssReg: /@import url\(([a-zA-Z_\-0-9\/]*)\.css\);/g,
	charset:'utf8',//源文件编码，也作为目标文件的编码
	cssBaseDir:'/home/workspace/css',
	sPath:'/home/workspace/css/all.css',//源文件路径 
	oPath:'/home/workspace/css/min/all-min.css',//目标文件路径 
	tmpDir: '/home/git-project/graceCode/tmp' //临时文件存放
};
exports.staticType = {
	1: 'JS',
	2: 'CSS'
};
