Host Environment
==============================

### Easily detect what host environment your code is running in

[![Build Status](https://api.travis-ci.com/JS-DevTools/host-environment.svg?branch=master)](https://travis-ci.com/JS-DevTools/host-environment)
[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/host-environment/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/host-environment)

[![npm](https://img.shields.io/npm/v/host-environment.svg)](https://www.npmjs.com/package/host-environment)
[![Dependencies](https://david-dm.org/JS-DevTools/host-environment.svg)](https://david-dm.org/JS-DevTools/host-environment)
[![License](https://img.shields.io/npm/l/host-environment.svg)](LICENSE)

[![OS and Browser Compatibility](https://jstools.dev/img/badges/ci-badges-with-ie.svg)](https://travis-ci.com/JS-DevTools/host-environment)


Host Environment is a [universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) library that makes it easy to detect what host environment your code is running in.  It lets you answer questions like:

- Am I running in Node.js or a web browser?
- Is this Node 8.x or newer?
- Are we in Internet Explorer?
- Is this a Windows computer?

Maybe some parts of your app are only available in Node and not in web browsers.  Or maybe you need to determine whether to load a [polyfill](https://en.wikipedia.org/wiki/Polyfill_(programming)) library.  Or maybe you need to [conditionally run tests](https://jstools.dev/karma-host-environment/) in different environments.  Whatever your reason, Host Environment can help.



Example
--------------------------

```javascript
import host from "host-environment";

if (host.browser) {
  // Browser logic here

  if (host.browser.IE) {
    // Load a polyfill for Internet Explorer
  }
}

if (host.node) {
  // Node.js logic here

  if (host.node.version < 8) {
    // Load a polyfill for older versions of Node
  }

  if (host.os.windows) {
    // Windows-specific logic here
  }
}
```



Related Projects
--------------------------
- [karma-host-environment](https://jstools.dev/karma-host-environment/)<br>
  Access environment variables and other system info in your browser tests.



Installation
--------------------------
Install using [npm](https://docs.npmjs.com/about-npm/):

```bash
npm install host-environment
```



Usage
--------------------------
When using Host Environment in Node.js apps, you'll probably want to use **CommonJS** syntax:

```javascript
const host = require("host-environment");
```

When using a transpiler such as [Babel](https://babeljs.io/) or [TypeScript](https://www.typescriptlang.org/), or a bundler such as [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/), you can use **ECMAScript modules** syntax instead:

```javascript
import host from "host-environment";
```



Browser support
--------------------------
Host Environment supports recent versions of every major web browser.  Older browsers may require [Babel](https://babeljs.io/) and/or [polyfills](https://babeljs.io/docs/en/next/babel-polyfill).

To use Host Environment in a browser, you'll need to use a bundling tool such as [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), [Parcel](https://parceljs.org/), or [Browserify](http://browserify.org/). Some bundlers may require a bit of configuration, such as setting `browser: true` in [rollup-plugin-resolve](https://github.com/rollup/rollup-plugin-node-resolve).



API
--------------------------

### `host.global`
When running in a web browser, `host.global` is a reference to the `window` object.  When running in Node.js, it's a reference to the `global` object.


### `host.os`
This property is an object with the following structure:

```javascript
{
  windows: false,       // Windows or Windows Phone
  mac: true,            // Mac OS or iOS
  linux: false          // Linux, Android, or other *nix platforms
}
```

> **Note:** Only _one_ of the properties will be `true`. All others are `false`.


### `host.env`
This property is an object containing environment variables as key/value strings.  When running in Node.js, it is set to [`process.env`](https://nodejs.org/api/process.html#process_process_env).

When running in a web browser, it is usually an empty object, since web browsers don't have access to environment variables. However, when paired with tools like [karma-host-environment](https://jstools.dev/karma-host-environment/), it's possible to work-around this limitation and allow you to access environment variables in the browser.

```javascript
{
  TERM: 'xterm-256color',
  SHELL: '/usr/local/bin/bash',
  USER: 'maciej',
  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
  PWD: '/Users/maciej',
  EDITOR: 'vim',
  SHLVL: '1',
  HOME: '/Users/maciej',
  LOGNAME: 'maciej',
  _: '/usr/local/bin/node'
}
```


### `host.node`
This property is `false` when running in a web browser.  When running in Node.js it is an object with the following structure:

```javascript
{
  v7: true,             // The major version, as a boolean
  version: 7.3,         // The major.minor version, as a float
  majorVersion: 7,      // The major version, as an integer
  minorVersion: 3,      // The minor version, as an integer
  patchVersion: 24      // The patch version, as an integer
}
```


### `host.browser`
This property is `false` when running in Node.js. When running in a browser it is an object with the following structure:

```javascript
{
  chrome: {             // false if not Chrome
    v58: true,          // The major version, as a boolean
    version: 58.4,      // The major.minor version, as a float
    majorVersion: 58,   // The major version, as an integer
    minorVersion: 4,    // The minor version, as an integer
    patchVersion: 3029, // The patch version, as an integer
    mobile: false,      // true on mobile
  },
  firefox: false,       // An object like above if running in Firefox
  safari: false,        // An object like above if running in Safari
  edge: false,          // An object like above if running in Edge
  IE: false,            // An object like above if running in Internet Explorer
  mobile: false,        // true for any mobile browser (iOS, Android, Windows Phone, etc)
}
```

> **Note:** Only _one_ of the browser properties will be an object. All others are `false`.



Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/JS-DevTools/host-environment/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/host-environment/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/JS-DevTools/host-environment.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`



License
--------------------------
host-environment is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jstools.dev/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jstools.dev/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jstools.dev/img/badges/coveralls.svg)](https://coveralls.io)
