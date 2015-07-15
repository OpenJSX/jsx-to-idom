## Incremental DOM Renderer for JSX-IR

### Installation

```npm install jsx-to-idom```

_**Note:** do not forget to install "incremental-dom" manually since from NPM 3 peer dependencies won't be installed automatically_

### Usage

#### Transpiling

```js
babel.transform(code, {
  plugins: ['jsx-to-idom/babel-plugin'],
  blacklist: ['react']
});
```
or any other way described [here](http://babeljs.io/docs/advanced/plugins/#usage), just pass `'jsx-to-idom/babel-plugin'`` as a plugin name.

### Runtime

```javascript
import { render } from 'jsx-to-idom';
import { patch } from 'incremental-dom'

patch(container, () => {
  render(<div className="hello">Hello World</div>);
});

```

## License

[MIT](LICENSE.md)