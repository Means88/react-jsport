import React from 'react';
import { load } from '../dist/JSPort';

export class Component1 extends React.Component {

  componentDidMount() {
    this.changeText();
  }

  componentDidUpdate() {
    this.changeText();
  }

  changeText() {
    $('#hello').text('Changed by jQuery');
  }

  render() {
    return (
      <button id="hello" className="btn btn-default">
        Bootstrap Button
      </button>
    );
  }
}

class _Component2 extends React.Component {

  render() {
    return (
      <div>
        Hello {this.props.text} {this.props.children} <span>{typeof _}</span>
      </div>
    );
  }
}

export const Component2 = load('https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js')(_Component2);
