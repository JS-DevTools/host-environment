import { Host, HostJSON } from "./host";

/**
 * Returns a copy of the host object that can be safely converted to JSON.
 */
export function toJSON(this: Host): HostJSON {
  let clone: HostJSON = {
    // The global object can't be serialized to JSON because it has circular references.
    // So call just serialize its toString() representation instead
    global: Object.prototype.toString.call(this.global),
    os: this.os,
    env: this.env,
    ci: this.ci,
    node: this.node,
    browser: this.browser,
  };

  return clone;
}
