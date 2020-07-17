/* eslint-env browser */
"use strict";

const { host } = require("../../");

console.log("\n==================== BEGIN DEBUG INFO ====================");

if (typeof window === "object") {
  console.log(`\nUSER AGENT:\n ${navigator.userAgent}`);
}

let pojo = host.toJSON();
pojo.env = Object.keys(pojo.env); // Don't log the values, which may have sensitive info
console.log(`\nHOST:\n ${JSON.stringify(pojo, undefined, 2)}`);

console.log("\n==================== END DEBUG INFO ====================");
