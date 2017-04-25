React JSPort
---

USAGE
===

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
===
- requirements list
- publish to npm
- cache

