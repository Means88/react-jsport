'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.load = load;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loadScript = require('./loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _loadStyle = require('./loadStyle');

var _loadStyle2 = _interopRequireDefault(_loadStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIME_TYPE = {
  JavaScript: 'text/javascript',
  CSS: 'text/css'
};

function typeofRequirement(requirement) {
  var temps = requirement.split('.');
  switch (temps[temps.length - 1]) {
    case 'js':
      return MIME_TYPE.JavaScript;
    case 'css':
      return MIME_TYPE.CSS;
    default:
      return null;
  }
}

var JSPort = function (_React$Component) {
  (0, _inherits3.default)(JSPort, _React$Component);

  function JSPort(props) {
    (0, _classCallCheck3.default)(this, JSPort);

    var _this = (0, _possibleConstructorReturn3.default)(this, (JSPort.__proto__ || (0, _getPrototypeOf2.default)(JSPort)).call(this, props));

    _this.state = {
      loaded: false,
      error: false
    };
    return _this;
  }

  (0, _createClass3.default)(JSPort, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.loadRequirements().then(function () {
        _this2.setState({ loaded: true });
      }).catch(function () {
        _this2.setState({ error: true });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if (this.props.require === nextProps.require) {
        return;
      }
      this.setState({
        loaded: false,
        error: false
      });
      this.loadRequirements().then(function () {
        _this3.setState({ loaded: true });
      }).catch(function () {
        _this3.setState({ error: true });
      });
    }
  }, {
    key: 'loadRequirements',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var requirements, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, requirement;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requirements = void 0;

                if (Array.isArray(this.props.require)) {
                  requirements = this.props.require;
                } else {
                  requirements = [this.props.require];
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = (0, _getIterator3.default)(requirements);

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 25;
                  break;
                }

                requirement = _step.value;

                if (!(!this.props.force && JSPort.requirementSet.has(requirement))) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt('continue', 22);

              case 11:
                _context.t0 = typeofRequirement(requirement);
                _context.next = _context.t0 === MIME_TYPE.JavaScript ? 14 : _context.t0 === MIME_TYPE.CSS ? 17 : 20;
                break;

              case 14:
                _context.next = 16;
                return (0, _loadScript2.default)(requirement);

              case 16:
                return _context.abrupt('break', 21);

              case 17:
                _context.next = 19;
                return (0, _loadStyle2.default)(requirement);

              case 19:
                return _context.abrupt('break', 21);

              case 20:
                return _context.abrupt('break', 21);

              case 21:
                JSPort.requirementSet.add(requirement);

              case 22:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 25:
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t1 = _context['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 31:
                _context.prev = 31;
                _context.prev = 32;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 34:
                _context.prev = 34;

                if (!_didIteratorError) {
                  _context.next = 37;
                  break;
                }

                throw _iteratorError;

              case 37:
                return _context.finish(34);

              case 38:
                return _context.finish(31);

              case 39:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 27, 31, 39], [32,, 34, 38]]);
      }));

      function loadRequirements() {
        return _ref.apply(this, arguments);
      }

      return loadRequirements;
    }()
  }, {
    key: 'render',
    value: function render() {
      if (this.state.loaded) {
        return this.props.children;
      }
      if (this.state.error) {
        return this.props.errorElement;
      }
      return this.props.loadingElement;
    }
  }]);
  return JSPort;
}(_react2.default.Component);

JSPort.requirementSet = new _set2.default();


JSPort.propTypes = {
  require: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
  force: _react.PropTypes.bool,
  children: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.arrayOf(_react.PropTypes.element)]),
  loadingElement: _react.PropTypes.element,
  errorElement: _react.PropTypes.element
};

JSPort.defaultProps = {
  require: [],
  force: false,
  children: null,
  loadingElement: null,
  errorElement: null
};

exports.default = JSPort;
function load(requirement, options) {
  return function (component) {
    var wrapper = function wrapper(props) {
      return _react2.default.createElement(
        JSPort,
        (0, _extends3.default)({ require: requirement }, options),
        _react2.default.createElement(component, props)
      );
    };
    return wrapper;
  };
}