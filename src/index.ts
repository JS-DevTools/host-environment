import { host } from "./isomorphic.node";

// Export type definitions as named exports
export * from "./host";
// Export the host object as a named export
export { host };


// Also export the host object as the default export
export default host;

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);
}
