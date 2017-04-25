React JSPort [![react-jsport](https://badge.fury.io/js/react-jsport.svg)](https://www.npmjs.com/package/react-jsport)
===

```
npm install react-jsport
```

DEMO
---
[https://means88.github.io/react-jsport/](https://means88.github.io/react-jsport/)

INTERFACE
---
```js
JSPort.propTypes = {
  // requirements, can be url or list of url
  require: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  // load requirements even if it has been loaded
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

function load(requirements = [], force = false);
```

USAGE
---

```js
class Component extends React.Component {

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

// import jQuery dynamically
import JSPort from 'react-jsport';

<JSPort require="https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js">
  <Component />
</JSPort>
```

Or decorate the Component

```js
import { load } from 'react-jsport';

Component = load("https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js")(Component);

// or

@load("https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js")
class Component extends React.Component {
  // ...
}
```

TODO
---
- cache
