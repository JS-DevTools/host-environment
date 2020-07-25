/* eslint-env browser */
import { Browsers, BrowsersRecord, Global, Host, OSInfo, OSInfoRecord } from "./host";
import { merge, mergeGlobalHost } from "./merge";
import { toJSON } from "./to-json";

const url = createURL(window.location.href);
const cwdURL = createURL(".", url);

/**
 * Information about the host environment that the code is running in.
 */
export const host: Host = {
  global: window as unknown as Global,
  url,
  path: url.href,
  cwdURL,
  cwd: cwdURL.href,
  os: getOSInfo(),
  node: false,
  browser: getBrowserInfo(),
  env: {},
  ci: false,
  merge,
  toJSON,
};

// Merge the global `host` object (if it exists)
mergeGlobalHost(host, host.global.host);

/**
 * Creates a URL object from a URL string
 */
function createURL(url: string, base?: URL): URL {
  try {
    return new URL(url, base);
  }
  catch (_) {
    // Poor-man's polyfill for browsers that don't support the URL class
    return { href: base ? base.href : url } as URL;
  }
}

/**
 * Returns information about the current Browser host.
 */
function getBrowserInfo(): Browsers {
  let mobile = /(Mobile|Android|iPhone|iPad)/.test(navigator.userAgent);

  let browsers: Browsers = {
    IE: false,        // eslint-disable-line @typescript-eslint/naming-convention
    edge: false,
    chrome: false,
    firefox: false,
    safari: false,
    mobile,
  };

  // NOTE: The order matters here!
  let browserPatterns = [
    { key: "edge", pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "IE", pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "IE", pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "chrome", pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "firefox", pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: "safari", pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ },
  ];

  // Find the FIRST matching browser
  for (let { key, pattern } of browserPatterns) {
    let match = pattern.exec(navigator.userAgent);
    if (match) {
      let major = parseInt(match[1], 10) || 0;
      let minor = parseInt(match[2], 10) || 0;
      let patch = parseInt(match[3], 10) || 0;

      (browsers as unknown as BrowsersRecord)[key] = {
        version: parseFloat(`${major}.${minor}`),
        majorVersion: major,
        minorVersion: minor,
        patchVersion: patch,
        [`v${major}`]: true,
        mobile,
      };

      break;
    }
  }

  return browsers;
}

/**
 * Returns information about the current operating system.
 */
function getOSInfo(): OSInfo {
  let osInfo: OSInfo = {
    windows: false,
    mac: false,
    linux: false,
  };

  // NOTE: The order matters here!
  let osPatterns = [
    { key: "mac", pattern: /(Mac OS|Macintosh|iPhone|iPad)/ },
    { key: "windows", pattern: /(Windows NT|Windows Phone)/ },
    { key: "linux", pattern: /(Linux|Android)/ },
  ];

  // Find the FIRST matching OS pattern
  for (let { key, pattern } of osPatterns) {
    let match = pattern.exec(navigator.userAgent);
    if (match) {
      // We found the OS, so mark it as `true` and leave all the others `false`
      (osInfo as unknown as OSInfoRecord)[key] = true;
      break;
    }
  }

  return osInfo;
}
