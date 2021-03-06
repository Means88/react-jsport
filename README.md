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
function load(requirements = [], options = {});
/**
 * @param requirements: array of url[dfault=[]]
 * @param options object[default={}]: {
 *   force: boolean[default=false], requirements with the same url will not be loaded twice by default
 *   loadingElement: ReactElement[default=null], be rendered while loading
 *   errorElement: ReactElement[default=null], be rendered when an error caused
 * }
 * @return ReactComponent
 */

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


load(requirements, options)(Component);
// ==>
<JSPort
  requirements={requirements}
  {...options}
>
  <Component />
</JSPort>
```

USAGE
---

```js
import { load } from 'react-jsport';

Component = load("https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js")(Component);

// or

@load("https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js")
class Component extends React.Component {
  // ...
}
```

Or wrapped in `JSPort`

```js
class Component extends React.Component {

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
      <a id="hello" className="btn btn-default">
        Hello world
      </a>
    );
  }
}

// import jQuery dynamically
import JSPort from 'react-jsport';

<JSPort
  require={[
    "https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js",
    "https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css",
  ]}
>
  <Component />
</JSPort>
```


TODO
---
- cache
