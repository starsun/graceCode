/**
 * @author shandan.com@gmail.com
 * format output string 
 */

exports.output = function(outStr) {

	var outBorder = ' '
	,	leng
	,	i
	;

	leng = outStr.length;
	for (i = 2; i < leng ; i++) {
		outBorder = outBorder + '-';
	}
	outBorder = outBorder + ' ';
	console.log(outBorder);
	console.log(outStr);
	console.log(outBorder);	
	
};
