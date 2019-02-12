"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("Environment variables", () => {

  it("host.env should be an object", () => {
    expect(host.env).to.be.an("object");
  });

  it("all keys should be valid environment variable names", () => {
    let allowedCharacters;

    if (host.os.windows) {
      allowedCharacters = /^[a-zA-Z0-9_()-]+$/;
    }
    else {
      allowedCharacters = /^[a-zA-Z0-9_%-]+$/;
    }

    for (let key of Object.keys(host.env)) {
      expect(key).to.match(allowedCharacters);
    }
  });

  it("all values should be strings", () => {
    for (let key of Object.keys(host.env)) {
      let value = host.env[key];
      expect(value).to.be.a("string");
    }
  });

  if (typeof window === "object") {

    it("should not have any environment variables", () => {
      expect(host.env).to.be.empty;
    });

  }
  else {

    it("should have environment variables", () => {
      expect(host.env).not.to.be.empty;
    });

    it("should have standard environment variables", () => {
      let path = host.env.PATH || host.env.Path;
      expect(path).not.to.be.empty;
    });

  }
});
