// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html
// https://jstools.dev/karma-config/

"use strict";
const { karmaConfig } = require("@jsdevtools/karma-config");
const { host } = require("./");

module.exports = karmaConfig({
  sourceDir: "esm",
  fixtures: "test/fixtures/**/*.js",
  browsers: {
    chrome: host.ci ? host.os.linux : true,
    firefox: host.ci ? host.os.linux : true,
    safari: host.ci ? host.os.linux : host.os.mac,
    edge: host.ci ? host.os.linux : host.os.windows,
    ie: host.os.windows,
  },
  config: {
    // Prevent Karma-Config from using the "karma-host-environment" framework,
    // which would cause obvious conflicts with this project
    frameworks: ["mocha"],
  }
});
