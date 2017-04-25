import React, { PropTypes } from 'react';
import loadScript from './loadScript';

class JSPort extends React.Component {

  static requirementSet = new Set();

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
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

  async loadRequirements(requirements) {
    for (const requirement of requirements) {
      if (!this.props.force && JSPort.requirementSet.has(requirement)) {
        continue;
      }
      JSPort.requirementSet.add(requirement);
      await loadScript(requirement);
    }
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

JSPort.propTypes = {
  require: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  force: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  loadingElement: PropTypes.element,
  errorElement: PropTypes.element,
};

JSPort.defaultProps = {
  require: [],
  force: false,
  children: null,
  loadingElement: null,
  errorElement: null,
};

export default JSPort;

export function load(requirement, force) {
  return function (component) {
    const wrapper = function (props) {
      return (
        <JSPort require={requirement} force={force}>
          {React.createElement(component, props)}
        </JSPort>
      );
    };
    return wrapper;
  };
}
