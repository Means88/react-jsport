'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.load = load;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loadScript = require('./loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JSPort = function (_React$Component) {
  _inherits(JSPort, _React$Component);

  function JSPort(props) {
    _classCallCheck(this, JSPort);

    var _this = _possibleConstructorReturn(this, (JSPort.__proto__ || Object.getPrototypeOf(JSPort)).call(this, props));

    _this.state = {
      loaded: false
    };
    return _this;
  }

  _createClass(JSPort, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (!this.props.require) {
        return;
      }
      (0, _loadScript2.default)(this.props.require, function () {
        _this2.setState({ loaded: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.loaded) {
        return this.props.children;
      }
      return null;
    }
  }]);

  return JSPort;
}(_react2.default.Component);

JSPort.propTypes = {
  require: _react.PropTypes.string,
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)])
};

JSPort.defaultProps = {
  require: null,
  children: null
};

exports.default = JSPort;
function load(requirement) {
  return function (component) {
    var wrapper = function wrapper(props) {
      return _react2.default.createElement(
        JSPort,
        { require: requirement },
        _react2.default.createElement(component, props)
      );
    };
    return wrapper;
  };
}