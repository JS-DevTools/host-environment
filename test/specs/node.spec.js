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
    /* eslint-env node */

    it("host.path should be the execPath", () => {
      expect(host.path).to.equal(process.execPath);
    });

    it("host.url should be a file:// URL", () => {
      expect(host.url.href).to.match(/^file:\/\//);
    });

    it("host.cwd should be the current working directory", () => {
      expect(host.cwd).to.equal(process.cwd());
    });

    it("host.cwdURL should be a file:// URL", () => {
      expect(host.cwdURL.href).to.match(/^file:\/\//);
    });


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
