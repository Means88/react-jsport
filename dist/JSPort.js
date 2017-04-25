function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { PropTypes } from 'react';
import loadScript from './loadScript';

class JSPort extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false
    };
  }

  componentWillMount() {
    let requirements;
    if (Array.isArray(this.props.require)) {
      requirements = this.props.require;
    } else {
      requirements = [this.props.require];
    }
    this.loadRequirements(requirements).then(() => {
      this.setState({ loaded: true });
    }).catch(() => {
      this.setState({ error: true });
    });
  }

  loadRequirements(requirements) {
    var _this = this;

    return _asyncToGenerator(function* () {
      for (const requirement of requirements) {
        if (!_this.props.force && JSPort.requirementSet.has(requirement)) {
          continue;
        }
        JSPort.requirementSet.add(requirement);
        yield loadScript(requirement);
      }
    })();
  }

  render() {
    if (this.state.loaded) {
      return this.props.children;
    }
    if (this.state.error) {
      return this.props.errorElement;
    }
    return this.props.loadingElement;
  }
}

JSPort.requirementSet = new Set();
JSPort.propTypes = {
  require: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  force: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  loadingElement: PropTypes.element,
  errorElement: PropTypes.element
};

JSPort.defaultProps = {
  require: [],
  force: false,
  children: null,
  loadingElement: null,
  errorElement: null
};

export default JSPort;

export function load(requirement, force) {
  return function (component) {
    const wrapper = function (props) {
      return React.createElement(
        JSPort,
        { require: requirement, force: force },
        React.createElement(component, props)
      );
    };
    return wrapper;
  };
}