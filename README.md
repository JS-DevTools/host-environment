Host Environment
==============================

### Easily detect what host environment your code is running in

When writing [universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9), you often end up needing to know what environment your code is running in.  Maybe some functionality is only available in Node and not in web browsers.  Or maybe you need to determine whether to load a [polyfill](https://en.wikipedia.org/wiki/Polyfill_(programming)) library.

**Host Environment** makes it easy to write that kind of conditional code.



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
- [karma-host-environment](https://jsdevtools.org/karma-host-environment/)<br>
  Access environment variables and other system info in your browser tests.



Installation
--------------------------
Install using [npm](https://docs.npmjs.com/about-npm/):

```bash
npm install host-environment
```



Usage
--------------------------
When using ES2015 syntax, you can simply `import` the `host` object:

```javascript
import host from "host-environment";
```

When using CommonJS syntax, we recommend that you `require()` the `host` object as a named export to ensure correct behavior with bundling tools like Webpack, Rollup, etc.

```javascript
const { host } = require("host-environment");
```



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

[![Travis CI](https://jsdevtools.org/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jsdevtools.org/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jsdevtools.org/img/badges/coveralls.svg)](https://coveralls.io)
