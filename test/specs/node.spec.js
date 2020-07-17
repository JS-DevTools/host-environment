/* eslint-env node */
"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("Node.js environment", () => {
  if (typeof window === "object") {

    it("host.node should be false", () => {
      expect(host.node).to.equal(false);
    });

  }
  else {

    it("host.node should be an object", () => {
      expect(host.node).to.be.an("object");
    });

    it("host.node.version should be set", () => {
      expect(host.node.version).to.be.a("number").above(0);

      let expected = parseFloat(/^v(\d+\.\d+)\.\d+/.exec(process.version)[1]);
      expect(host.node.version).to.equal(expected);
    });

    it("host.node.majorVersion should be set", () => {
      expect(host.node.majorVersion).to.be.a("number");

      let expected = parseFloat(/^v(\d+)\.\d+\.\d+/.exec(process.version)[1]);
      expect(host.node.majorVersion).to.equal(expected);
    });

    it("host.node.minorVersion should be set", () => {
      expect(host.node.minorVersion).to.be.a("number");

      let expected = parseFloat(/^v\d+\.(\d+)\.\d+/.exec(process.version)[1]);
      expect(host.node.minorVersion).to.equal(expected);
    });

    it("host.node.patchVersion should be set", () => {
      expect(host.node.patchVersion).to.be.a("number");

      let expected = parseFloat(/^v\d+\.\d+\.(\d+)/.exec(process.version)[1]);
      expect(host.node.patchVersion).to.equal(expected);
    });

    it("host.node.vXX should be set", () => {
      let vXX = /^(v\d+)\.\d+\.\d+/.exec(process.version)[1];
      expect(host.node[vXX]).to.equal(true);
    });

    it("host.node should not have any other properties", () => {
      expect(host.node).to.have.all.keys([
        "version",
        "majorVersion",
        "minorVersion",
        "patchVersion",
        "v" + host.node.majorVersion,
      ]);
    });

  }
});
