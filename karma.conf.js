// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html
// https://jstools.dev/karma-config/

"use strict";
const { karmaConfig } = require("@jsdevtools/karma-config");

const { host } = require("./");

module.exports = karmaConfig({
  sourceDir: "esm",
  browsers: {
    ie: true,
    edge: true,
    chrome: true,
    safari: true,
    firefox: host.os.linux,
  },
  config: {
    // Prevent Karma-Config from using the "karma-host-environment" framework,
    // which would cause obvious conflicts with this project
    frameworks: ["mocha"],
  }
});
