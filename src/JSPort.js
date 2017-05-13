import React, { PropTypes } from 'react';
import loadScript from './loadScript';
import loadStyle from './loadStyle';

const MIME_TYPE = {
  JavaScript: 'text/javascript',
  CSS: 'text/css',
};

function typeofRequirement(requirement) {
  const temps = requirement.split('.');
  switch (temps[temps.length - 1]) {
    case 'js':
      return MIME_TYPE.JavaScript;
    case 'css':
      return MIME_TYPE.CSS;
    default:
      return null;
  }
}

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
    this.loadRequirements().then(() => {
      this.setState({ loaded: true });
    }).catch(() => {
      this.setState({ error: true });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.require === nextProps) {
      return;
    }
    this.setState({
      loaded: false,
      error: false,
    });
    this.loadRequirements().then(() => {
      this.setState({ loaded: true });
    }).catch(() => {
      this.setState({ error: true });
    });
  }

  async loadRequirements() {
    let requirements;
    if (Array.isArray(this.props.require)) {
      requirements = this.props.require;
    } else {
      requirements = [this.props.require];
    }

    for (const requirement of requirements) {
      if (!this.props.force && JSPort.requirementSet.has(requirement)) {
        continue;
      }
      switch (typeofRequirement(requirement)) {
        case MIME_TYPE.JavaScript:
          await loadScript(requirement);
          break;
        case MIME_TYPE.CSS:
          await loadStyle(requirement);
          break;
        default:
          break;
      }
      JSPort.requirementSet.add(requirement);
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

export function load(requirement, options) {
  return function (component) {
    const wrapper = function (props) {
      return (
        <JSPort require={requirement} {...options}>
          {React.createElement(component, props)}
        </JSPort>
      );
    };
    return wrapper;
  };
}
