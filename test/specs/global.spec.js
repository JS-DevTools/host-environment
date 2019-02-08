"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("The global object", () => {

  it("host.global should be set", () => {
    expect(typeof host.global).to.equal("object");
  });

  if (typeof window === "object") {

    it("host.global should reference the window object", () => {
      expect(host.global).to.equal(window);
    });

  }
  else {

    it("host.global should reference the global object", () => {
      expect(host.global).to.equal(global);
    });

  }
});
