// tslint:disable: no-default-export
import { host } from "./isomorphic.node";

// Export type definitions as named exports
export * from "./host";

// Export the host object as a named export
export { host };

// Also export the host object as the default export
export default host;

// CommonJS default export hack
// tslint:disable: no-unsafe-any
if (typeof module === "object" && typeof exports === "object") {
  module.exports = exports.default;
  Object.assign(module.exports, exports);
}
