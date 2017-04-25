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
    $('#hello1').text('Changed by jQuery1');
  }

  render() {
    return (
      <div id="hello1">Hello world1</div>
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
