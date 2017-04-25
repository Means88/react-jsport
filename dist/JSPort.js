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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JSPort = function (_React$Component) {
  _inherits(JSPort, _React$Component);

  function JSPort(props) {
    _classCallCheck(this, JSPort);

    var _this = _possibleConstructorReturn(this, (JSPort.__proto__ || Object.getPrototypeOf(JSPort)).call(this, props));

    _this.state = {
      loaded: false,
      error: false
    };
    return _this;
  }

  _createClass(JSPort, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var requirements = void 0;
      if (Array.isArray(this.props.require)) {
        requirements = this.props.require;
      } else {
        requirements = [this.props.require];
      }
      this.loadRequirements(requirements).then(function () {
        _this2.setState({ loaded: true });
      }).catch(function () {
        _this2.setState({ error: true });
      });
    }
  }, {
    key: 'loadRequirements',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(requirements) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, requirement;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = requirements[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 15;
                  break;
                }

                requirement = _step.value;

                if (!(!this.props.force && JSPort.requirementSet.has(requirement))) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt('continue', 12);

              case 9:
                JSPort.requirementSet.add(requirement);
                _context.next = 12;
                return (0, _loadScript2.default)(requirement);

              case 12:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 21:
                _context.prev = 21;
                _context.prev = 22;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 24:
                _context.prev = 24;

                if (!_didIteratorError) {
                  _context.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context.finish(24);

              case 28:
                return _context.finish(21);

              case 29:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 17, 21, 29], [22,, 24, 28]]);
      }));

      function loadRequirements(_x) {
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

JSPort.requirementSet = new Set();


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
function load(requirement, force) {
  return function (component) {
    var wrapper = function wrapper(props) {
      return _react2.default.createElement(
        JSPort,
        { require: requirement, force: force },
        _react2.default.createElement(component, props)
      );
    };
    return wrapper;
  };
}