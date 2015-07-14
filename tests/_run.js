var runtime = require('./_get-runtime.js')();
var _mockdom = require('./_mockdom');

var run = function(view) {
  return _mockdom.run(function() {
    runtime.render(view);
  });
};

module.exports = run;