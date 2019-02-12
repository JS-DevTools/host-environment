import { Host } from "./host";

type POJO = Record<string, unknown>;

/**
 * Deep-merges the given object with the Host object.
 */
export function merge<T>(this: Host, props: T): Host & T {
  if (!isPOJO(props)) {
    let typeName = Object.prototype.toString.call(props);
    throw new Error(`Cannot merge ${typeName} with host.`);
  }

  // Skip the `host.global` property when merging the two hosts.
  // The global object should never be overridden.  It also contains circular
  // references to itself and to the `host` object, which would cause an infinite loop.
  let skip = "global";

  // Merge the global `host` object with the local `host` object
  deepMerge(this, props, skip);

  return this as (Host & T);
}

/**
 * Merges the global `host` object (if it exists) with the local `host` object.
 * This allows other libraries and tools to expose additional host information.
 *
 * For example, Karma-Host-Environment uses this to expose the Karma Server's host info
 * to web browser test scripts.
 *
 * @see https://jsdevtools.org/karma-host-environment/
 */
export function mergeGlobalHost(localHost: Host, globalHost: unknown) {
  if (isPOJO(globalHost)) {
    localHost.merge(globalHost);
  }
}

/**
 * Recursively merges two objects.
 */
function deepMerge(target: POJO, source: POJO, skip?: string): POJO {
  for (let key of Object.keys(source)) {
    if (key === skip) {
      // Don't merge this key.
      continue;
    }

    let sourceValue = source[key];
    let targetValue = target[key];

    if (isPOJO(sourceValue) && isPOJO(targetValue)) {
      target[key] = deepMerge(targetValue, sourceValue);
    }
    else {
      target[key] = sourceValue;
    }
  }

  return target;
}

function isPOJO(obj: unknown): obj is POJO {
  return obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    !(obj instanceof Date) &&
    !(obj instanceof RegExp);
}
