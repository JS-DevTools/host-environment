"use strict";

const defaultExport = require("../../");
const { host: namedExport } = require("../../");
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

  it("should export the host object as the default export", () => {
    assertHostObject(defaultExport);
  });

  it("should export the host object as a named export", () => {
    assertHostObject(namedExport);
  });

});
