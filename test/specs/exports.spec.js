"use strict";

const commonJSExport = require("../../");
const { default: defaultExport, host: namedExport } = require("../../");
const { expect } = require("chai");

describe("package exports", () => {

  function assertHostObject (host) {
    expect(host).to.be.an("object");
    expect(host).to.have.property("global");
    expect(host).to.have.property("os");
    expect(host).to.have.property("env");
    expect(host).to.have.property("node");
    expect(host).to.have.property("browser");
    expect(host).to.have.property("toJSON");
  }

  if (typeof window === "undefined") {

    it("should export the host object as the default CommonJS export", () => {
      assertHostObject(commonJSExport);
    });

  }
  else {

    it("should not export a default CommonJS export", () => {
      expect(commonJSExport).to.have.keys(["default", "host"]);
    });

  }

  it("should export the host object as the default ESM export", () => {
    assertHostObject(defaultExport);
  });

  it("should export the host object as a named ESM export", () => {
    assertHostObject(namedExport);
  });

});
