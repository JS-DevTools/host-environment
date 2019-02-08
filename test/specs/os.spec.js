"use strict";

const host = require("../../");
const { expect } = require("chai");

describe("Operating System environment", function () {

  it("host.os should be an object", function () {
    expect(host.os).to.be.an("object");
  });

  it("host.os.windows should be set", function () {
    expect(host.os.windows).to.be.a("boolean");
  });

  it("host.os.mac should be set", function () {
    expect(host.os.mac).to.be.a("boolean");
  });

  it("host.os.linux should be set", function () {
    expect(host.os.linux).to.be.a("boolean");
  });

  it("only one of the properties should be true", function () {
    let trueKeys = 0;

    for (let key of Object.keys(host.os)) {
      if (host.os[key]) {
        trueKeys++;
      }
    }

    expect(trueKeys).to.equal(1);
  });

  it("host.os should not have any other properties", function () {
    expect(host.os).to.have.all.keys(["windows", "mac", "linux"]);
  });

});
