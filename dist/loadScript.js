"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
/* eslint-disable */
(function (w) {
  var loadJS = function loadJS(src) {
    "use strict";

    var ref = w.document.getElementsByTagName("script")[0];
    var script = w.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
    return new _promise2.default(function (resolve) {
      script.onload = resolve;
    });
  };
  // commonjs
  if (typeof module !== "undefined") {
    module.exports = loadJS;
  } else {
    w.loadJS = loadJS;
  }
})(typeof global !== "undefined" ? global : undefined);