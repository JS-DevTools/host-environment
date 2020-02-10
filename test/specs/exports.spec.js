"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, host: namedExport } = require("../../");
const { expect } = require("chai");

describe("package exports", () => {

  function isHostObject (host) {
    expect(host).to.be.an("object");

    let keys = Object.keys(host);

    // Ignore the default and named exports
    for (let key of ["default", "host"]) {
      if (keys.indexOf(key) >= 0) {
        keys.splice(keys.indexOf(key), 1);
      }
    }

    expect(keys).to.have.same.members([
      "global",
      "os",
      "env",
      "ci",
      "node",
      "browser",
      "merge",
      "toJSON",
    ]);

    return true;
  }

  if (typeof window === "undefined") {

    it("should export the host object as the default CommonJS export", () => {
      expect(commonJSExport).to.satisfy(isHostObject);
    });

  }
  else {

    it("should not export a default CommonJS export", () => {
      expect(commonJSExport).to.have.keys("default", "host");
    });

  }

  it("should export the host object as the default ESM export", () => {
    expect(defaultExport).to.satisfy(isHostObject);
  });

  it("should export the host object as a named ESM export", () => {
    expect(namedExport).to.satisfy(isHostObject);
  });

});
