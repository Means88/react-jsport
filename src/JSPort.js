import React, { PropTypes } from 'react';
import loadScript from './loadScript';

class JSPort extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillMount() {
    if (!this.props.require) {
      return;
    }
    loadScript(this.props.require, () => {
      this.setState({ loaded: true });
    });
  }

  render() {
    if (this.state.loaded) {
      return this.props.children;
    }
    return null;
  }
}

JSPort.propTypes = {
  require: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
};

JSPort.defaultProps = {
  require: null,
  children: null,
};

export default JSPort;

export function load(requirement) {
  return function (component) {
    const wrapper = function (props) {
      return (
        <JSPort require={requirement}>
          {React.createElement(component, props)}
        </JSPort>
      );
    };
    return wrapper;
  };
}
