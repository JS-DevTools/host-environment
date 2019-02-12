"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("host.merge()", () => {
  // Create a snapshot of the orignal `host` object before we make any changes to it
  let originalHost = copy(host);

  // Reset the `host` object back to its original state after each test
  afterEach("Reset the host object", () => {
    assign(host, copy(originalHost));
    for (let key of Object.keys(host)) {
      if (!(key in originalHost)) {
        delete host[key];
      }
    }
  });

  it("should do nothing if called with an empty object", () => {
    let clone = copy(originalHost);
    host.merge({});
    expect(host).to.deep.equal(clone);
  });

  it("should merge top-level properties", () => {
    let clone = copy(originalHost);

    host.merge({
      boolean: true,
      string: "hello, world",
      number: 123.456,
      date: new Date(2000, 1, 1),
      regexp: /xyz/,
    });

    expect(host).to.deep.equal(assign(clone, {
      boolean: true,
      string: "hello, world",
      number: 123.456,
      date: new Date(2000, 1, 1),
      regexp: /xyz/,
    }));
  });

  it("should merge falsy properties", () => {
    let clone = copy(originalHost);

    host.merge({
      boolean: false,
      string: "",
      number: 0,
      nullValue: null,
      undefinedValue: undefined,
    });

    expect(host).to.deep.equal(assign(clone, {
      boolean: false,
      string: "",
      number: 0,
      nullValue: null,
      undefinedValue: undefined,
    }));
  });

  it("should merge deep properties", () => {
    let clone = copy(originalHost);

    host.merge({
      emptyObject: {},
      object: {
        boolean: true,
        string: "hello, world",
        number: 123.456,
        date: new Date(2000, 1, 1),
        regexp: /xyz/,
        deepObject: {
          boolean: false,
          string: "",
          number: 0,
          nullValue: null,
          undefinedValue: undefined,
        },
      }
    });

    expect(host).to.deep.equal(assign(clone, {
      emptyObject: {},
      object: {
        boolean: true,
        string: "hello, world",
        number: 123.456,
        date: new Date(2000, 1, 1),
        regexp: /xyz/,
        deepObject: {
          boolean: false,
          string: "",
          number: 0,
          nullValue: null,
          undefinedValue: undefined,
        },
      }
    }));
  });

  it("should merge existing properties", () => {
    let clone = copy(originalHost);

    host.merge({
      node: false,
      browser: false,
      os: {
        windows95: false,
        windowsVista: true,
      }
    });

    expect(host).to.deep.equal(assign(clone, {
      node: false,
      browser: false,
      os: assign({}, clone.os, {
        windows95: false,
        windowsVista: true,
      })
    }));
  });

  it("should throw an error if called without any args", () => {
    function mergeWithNoArgs () {
      host.merge();
    }

    expect(mergeWithNoArgs).to.throw("Cannot merge [object Undefined] with host.");
  });

  it("should throw an error if called with a falsy value", () => {
    expect(merge(undefined)).to.throw("Cannot merge [object Undefined] with host.");
    expect(merge(null)).to.throw("Cannot merge [object Null] with host.");
    expect(merge(NaN)).to.throw("Cannot merge [object Number] with host.");
    expect(merge(false)).to.throw("Cannot merge [object Boolean] with host.");
    expect(merge("")).to.throw("Cannot merge [object String] with host.");
    expect(merge(0)).to.throw("Cannot merge [object Number] with host.");
  });

  it("should throw an error if called with a non-object value", () => {
    expect(merge(true)).to.throw("Cannot merge [object Boolean] with host.");
    expect(merge("hello, world")).to.throw("Cannot merge [object String] with host.");
    expect(merge(12345)).to.throw("Cannot merge [object Number] with host.");
  });

  it("should throw an error if called with a built-in class instance", () => {
    expect(merge(new Date())).to.throw("Cannot merge [object Date] with host.");
    expect(merge(/this is a RegExp/)).to.throw("Cannot merge [object RegExp] with host.");
    expect(merge(["this", "is", "an", "array"])).to.throw("Cannot merge [object Array] with host.");
  });

  /**
   * Helper function to create deep copies of the `host` object.
   */
  function copy (source) {
    let clone = assign({}, source);
    clone.os = assign({}, source.os);
    clone.env = assign({}, source.env);

    if (source.node) {
      clone.node = assign({}, source.node);
    }

    if (source.browser) {
      clone.browser = {
        IE: source.browser.IE ? assign({}, source.browser.IE) : source.browser.IE,
        edge: source.browser.edge ? assign({}, source.browser.edge) : source.browser.edge,
        chrome: source.browser.chrome ? assign({}, source.browser.chrome) : source.browser.chrome,
        firefox: source.browser.firefox ? assign({}, source.browser.firefox) : source.browser.firefox,
        safari: source.browser.safari ? assign({}, source.browser.safari) : source.browser.safari,
        mobile: source.browser.mobile,
      };
    }

    return clone;
  }

  /**
   * A simple implementation of `Object.assign()`, since IE 11 doesn't support it.
   */
  function assign (target, ...sources) {
    for (let source of sources) {
      for (let key of Object.keys(source)) {
        target[key] = source[key];
      }
    }
    return target;
  }

  /**
   * Helper function to call `host.merge()` with the specified value, to check for errors.
   */
  function merge (value) {
    return function hostMerge () {
      host.merge(value);
    };
  }
});
