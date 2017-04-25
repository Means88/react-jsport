import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import JSPort from '../dist/JSPort';
import { Component1, Component2 } from './component';

class App extends React.Component {
  render() {
    return (
      <div>
        <JSPort require="https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js">
          <Component1 />
        </JSPort>
        <Component2 text="world">
          yes
        </Component2>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
