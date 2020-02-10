"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("CI/CD host", () => {

  if (typeof window === "undefined" && process.env.GITHUB_ACTIONS === "true") {

    it("host.ci should be an object", () => {
      expect(host.ci).to.be.an("object");
    });

    it("host.ci.name should be a string", () => {
      expect(host.ci.name).to.be.a("string").with.length.above(0);
    });

    it("host.ci.pr should be a boolean", () => {
      expect(host.ci.name).to.be.a("boolean");
    });

    it("all other properties should be CI/CD constants", () => {
      let keys = Object.keys(host.ci);

      // Remove other properties
      for (let key of ["name", "pr", "isPR"]) {
        keys.splice(keys.indexOf(key), 1);
      }

      for (let key of keys) {
        expect(key).to.match(/[A-Z]+(_[A-Z]+)*/);
        expect(host.ci[key]).to.be.a("boolean", `Invalid CI/CD constant: ${key}`);
      }
    });

  }
  else {

    it("host.ci should be false", () => {
      expect(host.ci).to.equal(false);
    });

  }

});
