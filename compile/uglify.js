/**
 * @author shandan.com@gmail.com
 * @param iCode input code
 * @param options 
 * @return output code 
 */


function uglify(iCode, options){
  options || (options = {});
  var jsp = uglify.parser;
  var pro = uglify.uglify;
  var ast = jsp.parse(iCode, options.strict_semicolons); // parse code and get the initial AST
  
  if (options.isMangle) {
	  ast = pro.ast_mangle(ast, options.mangle_options); // get a new AST with mangled names
	  ast = pro.ast_squeeze(ast, options.squeeze_options); // get an AST with compression optimizations
  }
  var oCode = pro.gen_code(ast, options.gen_options) + '\n'; // compressed code here
  return oCode;
}

uglify.parser = require("./lib/parse-js");
uglify.uglify = require("./lib/process");
uglify.consolidator = require("./lib/consolidator");

module.exports = uglify;
