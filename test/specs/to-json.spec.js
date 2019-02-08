"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("host.toJSON()", function () {

  it("host.toJSON should be a function", function () {
    expect(host.toJSON).to.be.an("function");
  });

  it("host.toJSON should return an object", function () {
    let result = host.toJSON();
    expect(result).to.be.an("object");
  });

  it("host.toJSON should only have the expected properties", function () {
    let result = host.toJSON();
    expect(result).to.have.keys([
      "global",
      "os",
      "env",
      "browser",
      "node",
    ]);
  });

  it("The global property should be stringified", function () {
    let result = host.toJSON();
    expect(result.global).to.be.a("string");

    if (typeof window === "object") {
      expect(result.global).to.equal("[object Window]");
    }
    else {
      expect(result.global).to.equal("[object global]");
    }
  });

  it("All other properties should match the host object", function () {
    let result = host.toJSON();
    expect(result.os).to.deep.equal(host.os);
    expect(result.env).to.deep.equal(host.env);
    expect(result.browser).to.deep.equal(host.browser);
    expect(result.node).to.deep.equal(host.node);
  });

  it("JSON.stringify(host) should behave as expected", function () {
    let pojo = host.toJSON();
    let json = JSON.stringify(host);

    expect(JSON.parse(json)).to.deep.equal(pojo);
  });

});
