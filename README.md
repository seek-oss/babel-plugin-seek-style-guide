[![Build Status](https://img.shields.io/travis/seek-oss/babel-plugin-seek-style-guide/master.svg?style=flat-square)](http://travis-ci.org/seek-oss/babel-plugin-seek-style-guide) [![npm](https://img.shields.io/npm/v/babel-plugin-seek-style-guide.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-seek-style-guide) [![David](https://img.shields.io/david/seek-oss/babel-plugin-seek-style-guide.svg?style=flat-square)](https://david-dm.org/seek-oss/babel-plugin-seek-style-guide) [![David](https://img.shields.io/david/dev/seek-oss/babel-plugin-seek-style-guide.svg?style=flat-square)](https://david-dm.org/seek-oss/babel-plugin-seek-style-guide?type=dev) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

# babel-plugin-seek-style-guide

Optimise your bundle by automatically rewriting import statements from [seek-style-guide](https://github.com/seek-oss/seek-style-guide).

For example, turn this:

```js
import { Text, Button } from 'seek-style-guide/react';
```

Into this:

```js
import Text from 'seek-style-guide/react/Text/Text';
import Button from 'seek-style-guide/react/Button/Button';
```

## Setup

First, install from npm:

```bash
$ npm install --save-dev babel-plugin-seek-style-guide
```

Then, add `seek-style-guide` to the plugins list in your [Babel](https://babeljs.io) config. For example, in `.babelrc`:

```json
{
  "plugins": ["seek-style-guide"]
}
```

## Contributing

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT.
