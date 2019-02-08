"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("The global object", function () {

  it("host.global should be set", function () {
    expect(typeof host.global).to.equal("object");
  });

  if (typeof window === "object") {

    it("host.global should reference the window object", function () {
      expect(host.global).to.equal(window);
    });

  }
  else {

    it("host.global should reference the global object", function () {
      expect(host.global).to.equal(global);
    });

  }
});
