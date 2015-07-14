var fs = require('fs');
var path = require('path');
var Module = require('module');

var modulePaths = module.paths;

function requireString(src, filePath, fileName) {
  var module = new Module(fileName);

  module.filename = filePath;
  module.paths = Module._nodeModulePaths(path.dirname(filePath));
  module._compile(src, filePath);

  return module.exports;
}

module.exports = function(filePath) {
  filePath = path.join(__dirname, filePath || '../index.js');

  var file = fs.readFileSync(filePath, 'utf-8');
  var mock = '"use strict"; var _mockdom = require("./tests/_mockdom");\n';

  var fakeName = '../fake-runtime.js';
  var module = requireString(mock + '\n' + file, path.join(__dirname, fakeName), fakeName);

  return module;
};