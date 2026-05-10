/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../plugin-slug/node_modules/@remix-run/router/dist/router.js":
/*!********************************************************************!*\
  !*** ../plugin-slug/node_modules/@remix-run/router/dist/router.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortedDeferredError: () => (/* binding */ AbortedDeferredError),
/* harmony export */   Action: () => (/* binding */ Action),
/* harmony export */   IDLE_BLOCKER: () => (/* binding */ IDLE_BLOCKER),
/* harmony export */   IDLE_FETCHER: () => (/* binding */ IDLE_FETCHER),
/* harmony export */   IDLE_NAVIGATION: () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   UNSAFE_DEFERRED_SYMBOL: () => (/* binding */ UNSAFE_DEFERRED_SYMBOL),
/* harmony export */   UNSAFE_DeferredData: () => (/* binding */ DeferredData),
/* harmony export */   UNSAFE_ErrorResponseImpl: () => (/* binding */ ErrorResponseImpl),
/* harmony export */   UNSAFE_convertRouteMatchToUiMatch: () => (/* binding */ convertRouteMatchToUiMatch),
/* harmony export */   UNSAFE_convertRoutesToDataRoutes: () => (/* binding */ convertRoutesToDataRoutes),
/* harmony export */   UNSAFE_decodePath: () => (/* binding */ decodePath),
/* harmony export */   UNSAFE_getResolveToMatches: () => (/* binding */ getResolveToMatches),
/* harmony export */   UNSAFE_invariant: () => (/* binding */ invariant),
/* harmony export */   UNSAFE_warning: () => (/* binding */ warning),
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   createPath: () => (/* binding */ createPath),
/* harmony export */   createRouter: () => (/* binding */ createRouter),
/* harmony export */   createStaticHandler: () => (/* binding */ createStaticHandler),
/* harmony export */   data: () => (/* binding */ data),
/* harmony export */   defer: () => (/* binding */ defer),
/* harmony export */   generatePath: () => (/* binding */ generatePath),
/* harmony export */   getStaticContextFromError: () => (/* binding */ getStaticContextFromError),
/* harmony export */   getToPathname: () => (/* binding */ getToPathname),
/* harmony export */   isDataWithResponseInit: () => (/* binding */ isDataWithResponseInit),
/* harmony export */   isDeferredData: () => (/* binding */ isDeferredData),
/* harmony export */   isRouteErrorResponse: () => (/* binding */ isRouteErrorResponse),
/* harmony export */   joinPaths: () => (/* binding */ joinPaths),
/* harmony export */   json: () => (/* binding */ json),
/* harmony export */   matchPath: () => (/* binding */ matchPath),
/* harmony export */   matchRoutes: () => (/* binding */ matchRoutes),
/* harmony export */   normalizePathname: () => (/* binding */ normalizePathname),
/* harmony export */   parsePath: () => (/* binding */ parsePath),
/* harmony export */   redirect: () => (/* binding */ redirect),
/* harmony export */   redirectDocument: () => (/* binding */ redirectDocument),
/* harmony export */   replace: () => (/* binding */ replace),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   resolveTo: () => (/* binding */ resolveTo),
/* harmony export */   stripBasename: () => (/* binding */ stripBasename)
/* harmony export */ });
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////
/**
 * Actions represent the type of change to a location value.
 */
var Action;
(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */
function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries; // Declare so we can access from createMemoryLocation
  entries = initialEntries.map((entry, index) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window.location;
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */
function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window.location.hash.substr(1));
    // Hash URL should always have a leading / just like window.location.pathname
    // does, so if an app ends up at a route like /#something then we add a
    // leading slash so all of our path-matching behaves the same as if it would
    // in a browser router.  This is particularly important when there exists a
    // root splat route (<Route path="*">) since that matches internally against
    // "/*" and we'd expect /#something to 404 in a hash router app.
    if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
      pathname = "/" + pathname;
    }
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createHashHref(window, to) {
    let base = window.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);
    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience, so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  // Index should only be null when we initialize. If not, it's because the
  // user called history.pushState or history.replaceState directly, in which
  // case we should log a warning as it will result in bugs.
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    // try...catch because iOS limits us to 100 pushState calls :/
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // If the exception is because `state` can't be serialized, let that throw
      // outwards just like a replace call would so the dev knows the cause
      // https://html.spec.whatwg.org/multipage/nav-history-apis.html#shared-history-push/replace-state-steps
      // https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    // window.location.origin is "null" (the literal string value) in Firefox
    // under certain conditions, notably when serving from a local HTML file
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
    let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    // Treating this as a full URL will strip any trailing spaces so we need to
    // pre-encode them since they might be part of a matching splat param from
    // an ancestor route
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window, to);
    },
    createURL,
    encodeLocation(to) {
      // Encode a Location the same way window.location would
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
//#endregion

var ResultType;
(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));
const immutableRouteKeys = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
}
// Walk the route tree generating unique IDs where necessary, so we are working
// solely with AgnosticDataRouteObject's within the Router
function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes.map((route, index) => {
    let treePath = [...parentPath, String(index)];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id], "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");
    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties(route), {
        id
      });
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
        id,
        children: undefined
      });
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/v6/utils/match-routes
 */
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i], decoded, allowPartial);
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === undefined ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    // Add the children before adding this route to the array, so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.
    if (route.children && route.children.length > 0) {
      invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    // coarse-grain check for optional params
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
/**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  // Optional path segments are denoted by a trailing `?`
  let isOptional = first.endsWith("?");
  // Compute the corresponding required segment: `foo?` -> `foo`
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    // Intepret empty string as omitting an optional segment
    // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  // All child paths with the prefix.  Do this for all children before the
  // optional version for all children, so we get consistent ordering where the
  // parent optional aspect is preferred as required.  Otherwise, we can get
  // child sections interspersed where deeper optional segments are higher than
  // parent optional segments, where for example, /:two would explode _earlier_
  // then /:one.  By always including the parent as required _for all children_
  // first, we avoid this issue
  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/")));
  // Then, if this is an optional value, add all child versions without
  if (isOptional) {
    result.push(...restExploded);
  }
  // for absolute paths, ensure `/` instead of empty segment
  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
  : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = s => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ?
  // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] :
  // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}
function matchRouteBranch(branch, pathname, allowPartial) {
  if (allowPartial === void 0) {
    allowPartial = false;
  }
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
      match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: false
      }, remainingPathname);
    }
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/v6/utils/generate-path
 */
function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
    path = path.replace(/\*$/, "/*");
  }
  // ensure `/` is added at the beginning if the path is absolute
  const prefix = path.startsWith("/") ? "/" : "";
  const stringify = p => p == null ? "" : typeof p === "string" ? p : String(p);
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    // only apply the splat if it's the last segment
    if (isLastSegment && segment === "*") {
      const star = "*";
      // Apply the splat
      return stringify(params[star]);
    }
    const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      invariant(optional === "?" || param != null, "Missing \":" + key + "\" param");
      return stringify(param);
    }
    // Remove any optional markers from optional static segments
    return segment.replace(/\?$/g, "");
  })
  // Remove empty segments
  .filter(segment => !!segment);
  return prefix + segments.join("/");
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/v6/utils/match-path
 */
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo[paramName] = undefined;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^${}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex, so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map(v => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/v6/utils/resolve-path
 */
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
// Return the array of pathnames for the current route matches - used to
// generate the routePathnames input for resolveTo()
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  // When v7_relativeSplatPath is enabled, use the full pathname for the leaf
  // match so we include splat values for "." links.  See:
  // https://github.com/remix-run/react-router/issues/11052#issuecomment-1836589329
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map(match => match.pathnameBase);
}
/**
 * @private
 */
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    // With relative="route" (the default), each leading .. segment means
    // "go up one route" instead of "go up one URL segment".  This is a key
    // difference from how <a href> works and a major reason we call this a
    // "to" value instead of a "href".
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  // Ensure the pathname has a trailing slash if the original "to" had one
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  // Or if this was a link to the current path which has a trailing slash
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
/**
 * @private
 */
function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */
const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
/**
 * @private
 */
const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
/**
 * @private
 */
const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
/**
 * @private
 */
const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @deprecated The `json` method is deprecated in favor of returning raw objects.
 * This method will be removed in v7.
 */
const json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
class DataWithResponseInit {
  constructor(data, init) {
    this.type = "DataWithResponseInit";
    this.data = data;
    this.init = init || null;
  }
}
/**
 * Create "responses" that contain `status`/`headers` without forcing
 * serialization into an actual `Response` - used by Remix single fetch
 */
function data(data, init) {
  return new DataWithResponseInit(data, typeof init === "number" ? {
    status: init
  } : init);
}
class AbortedDeferredError extends Error {}
class DeferredData {
  constructor(data, responseInit) {
    this.pendingKeysSet = new Set();
    this.subscribers = new Set();
    this.deferredKeys = [];
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects");
    // Set up an AbortController + Promise we can race against to exit early
    // cancellation
    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();
    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
    if (this.done) {
      // All incoming values were resolved
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }
    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key);
    // We store a little wrapper promise that will be extended with
    // _data/_error props upon resolve/reject
    let promise = Promise.race([value, this.abortPromise]).then(data => this.onSettle(promise, key, undefined, data), error => this.onSettle(promise, key, error));
    // Register rejection listeners to avoid uncaught promise rejections on
    // errors or aborted deferred values
    promise.catch(() => {});
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }
  onSettle(promise, key, error, data) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }
    this.pendingKeysSet.delete(key);
    if (this.done) {
      // Nothing left to abort!
      this.unlistenAbortSignal();
    }
    // If the promise was resolved/rejected with undefined, we'll throw an error as you
    // should always resolve with a value or null
    if (error === undefined && data === undefined) {
      let undefinedError = new Error("Deferred data for key \"" + key + "\" resolved/rejected with `undefined`, " + "you must resolve/reject with a value or `null`.");
      Object.defineProperty(promise, "_error", {
        get: () => undefinedError
      });
      this.emit(false, key);
      return Promise.reject(undefinedError);
    }
    if (data === undefined) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }
    Object.defineProperty(promise, "_data", {
      get: () => data
    });
    this.emit(false, key);
    return data;
  }
  emit(aborted, settledKey) {
    this.subscribers.forEach(subscriber => subscriber(aborted, settledKey));
  }
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
    this.emit(true);
  }
  async resolveData(signal) {
    let aborted = false;
    if (!this.done) {
      let onAbort = () => this.cancel();
      signal.addEventListener("abort", onAbort);
      aborted = await new Promise(resolve => {
        this.subscribe(aborted => {
          signal.removeEventListener("abort", onAbort);
          if (aborted || this.done) {
            resolve(aborted);
          }
        });
      });
    }
    return aborted;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref3) => {
      let [key, value] = _ref3;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
/**
 * @deprecated The `defer` method is deprecated in favor of returning raw
 * objects. This method will be removed in v7.
 */
const defer = function defer(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data, responseInit);
};
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */
const redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
/**
 * A redirect response that will force a document reload to the new location.
 * Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */
const redirectDocument = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Reload-Document", "true");
  return response;
};
/**
 * A redirect response that will perform a `history.replaceState` instead of a
 * `history.pushState` for client-side navigation redirects.
 * Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */
const replace = (url, init) => {
  let response = redirect(url, init);
  response.headers.set("X-Remix-Replace", "true");
  return response;
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 *
 * We don't export the class for public use since it's an implementation
 * detail, but we export the interface above so folks can build their own
 * abstractions around instances via isRouteErrorResponse()
 */
class ErrorResponseImpl {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }
}
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}

const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined,
  json: undefined,
  text: undefined
};
const IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined,
  json: undefined,
  text: undefined
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: undefined,
  reset: undefined,
  location: undefined
};
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const defaultMapRouteProperties = route => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
const TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////
/**
 * Create a router and listen to history POP navigations
 */
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : undefined;
  const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  const isServer = !isBrowser;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties;
  if (init.mapRouteProperties) {
    mapRouteProperties = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  // Routes keyed by ID
  let manifest = {};
  // Routes in tree format for matching
  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, undefined, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  let dataStrategyImpl = init.dataStrategy || defaultDataStrategy;
  let patchRoutesOnNavigationImpl = init.patchRoutesOnNavigation;
  // Config driven behavior flags
  let future = _extends({
    v7_fetcherPersist: false,
    v7_normalizeFormMethod: false,
    v7_partialHydration: false,
    v7_prependBasename: false,
    v7_relativeSplatPath: false,
    v7_skipActionErrorRevalidation: false
  }, init.future);
  // Cleanup function for history
  let unlistenHistory = null;
  // Externally-provided functions to call on all state changes
  let subscribers = new Set();
  // Externally-provided object to hold scroll restoration locations during routing
  let savedScrollPositions = null;
  // Externally-provided function to get scroll restoration keys
  let getScrollRestorationKey = null;
  // Externally-provided function to get current scroll position
  let getScrollPosition = null;
  // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition
  // Set to true if we have `hydrationData` since we assume we were SSR'd and that
  // SSR did the initial scroll restoration.
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialMatchesIsFOW = false;
  let initialErrors = null;
  if (initialMatches == null && !patchRoutesOnNavigationImpl) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  // In SPA apps, if the user provided a patchRoutesOnNavigation implementation and
  // our initial match is a splat route, clear them out so we run through lazy
  // discovery on hydration in case there's a more accurate lazy route match.
  // In SSR apps (with `hydrationData`), we expect that the server will send
  // up the proper matched routes so we don't want to run lazy discovery on
  // initial hydration and want to hydrate into the splat route.
  if (initialMatches && !init.hydrationData) {
    let fogOfWar = checkFogOfWar(initialMatches, dataRoutes, init.history.location.pathname);
    if (fogOfWar.active) {
      initialMatches = null;
    }
  }
  let initialized;
  if (!initialMatches) {
    initialized = false;
    initialMatches = [];
    // If partial hydration and fog of war is enabled, we will be running
    // `patchRoutesOnNavigation` during hydration so include any partial matches as
    // the initial matches so we can properly render `HydrateFallback`'s
    if (future.v7_partialHydration) {
      let fogOfWar = checkFogOfWar(null, dataRoutes, init.history.location.pathname);
      if (fogOfWar.active && fogOfWar.matches) {
        initialMatchesIsFOW = true;
        initialMatches = fogOfWar.matches;
      }
    }
  } else if (initialMatches.some(m => m.route.lazy)) {
    // All initialMatches need to be loaded before we're ready.  If we have lazy
    // functions around still then we'll need to run them in initialize()
    initialized = false;
  } else if (!initialMatches.some(m => m.route.loader)) {
    // If we've got no loaders to run, then we're good to go
    initialized = true;
  } else if (future.v7_partialHydration) {
    // If partial hydration is enabled, we're initialized so long as we were
    // provided with hydrationData for every route with a loader, and no loaders
    // were marked for explicit hydration
    let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
    let errors = init.hydrationData ? init.hydrationData.errors : null;
    // If errors exist, don't consider routes below the boundary
    if (errors) {
      let idx = initialMatches.findIndex(m => errors[m.route.id] !== undefined);
      initialized = initialMatches.slice(0, idx + 1).every(m => !shouldLoadRouteOnHydration(m.route, loaderData, errors));
    } else {
      initialized = initialMatches.every(m => !shouldLoadRouteOnHydration(m.route, loaderData, errors));
    }
  } else {
    // Without partial hydration - we're initialized if we were provided any
    // hydrationData - which is expected to be complete
    initialized = init.hydrationData != null;
  }
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map(),
    blockers: new Map()
  };
  // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)
  let pendingAction = Action.Pop;
  // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?
  let pendingPreventScrollReset = false;
  // AbortController for the active navigation
  let pendingNavigationController;
  // Should the current navigation enable document.startViewTransition?
  let pendingViewTransitionEnabled = false;
  // Store applied view transitions so we can apply them on POP
  let appliedViewTransitions = new Map();
  // Cleanup function for persisting applied transitions to sessionStorage
  let removePageHideEventListener = null;
  // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted
  let isUninterruptedRevalidation = false;
  // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidator()
  //  - X-Remix-Revalidate (from redirect)
  let isRevalidationRequired = false;
  // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission
  let cancelledDeferredRoutes = [];
  // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation
  let cancelledFetcherLoads = new Set();
  // AbortControllers for any in-flight fetchers
  let fetchControllers = new Map();
  // Track loads based on the order in which they started
  let incrementingLoadId = 0;
  // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation
  let pendingNavigationLoadId = -1;
  // Fetchers that triggered data reloads as a result of their actions
  let fetchReloadIds = new Map();
  // Fetchers that triggered redirect navigations
  let fetchRedirectIds = new Set();
  // Most recent href/match for fetcher.load calls for fetchers
  let fetchLoadMatches = new Map();
  // Ref-count mounted fetchers so we know when it's ok to clean them up
  let activeFetchers = new Map();
  // Fetchers that have requested a delete when using v7_fetcherPersist,
  // they'll be officially removed after they return to idle
  let deletedFetchers = new Set();
  // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.
  let activeDeferreds = new Map();
  // Store blocker functions in a separate Map outside of router state since
  // we don't need to update UI state if they change
  let blockerFunctions = new Map();
  // Flag to ignore the next history update, so we can revert the URL change on
  // a POP navigation that was blocked by the user without touching router state
  let unblockBlockerHistoryUpdate = undefined;
  // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();
  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(_ref => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      // Ignore this event if it was just us resetting the URL from a
      // blocked POP navigation
      if (unblockBlockerHistoryUpdate) {
        unblockBlockerHistoryUpdate();
        unblockBlockerHistoryUpdate = undefined;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location " + "that was not created by @remix-run/router. This will fail silently in " + "production. This can happen if you are navigating outside the router " + "via `window.history.pushState`/`window.location.hash` instead of using " + "router navigation APIs.  This can also happen if you are using " + "createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        // Restore the URL to match the current UI, but don't update router state
        let nextHistoryUpdatePromise = new Promise(resolve => {
          unblockBlockerHistoryUpdate = resolve;
        });
        init.history.go(delta * -1);
        // Put the blocker into a blocked state
        updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: undefined,
              reset: undefined,
              location
            });
            // Re-do the same POP navigation we just blocked, after the url
            // restoration is also complete.  See:
            // https://github.com/remix-run/react-router/issues/11613
            nextHistoryUpdatePromise.then(() => init.history.go(delta));
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER);
            updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    });
    if (isBrowser) {
      // FIXME: This feels gross.  How can we cleanup the lines between
      // scrollRestoration/appliedTransitions persistance?
      restoreAppliedTransitions(routerWindow, appliedViewTransitions);
      let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
      routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
      removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
    }
    // Kick off initial data load if needed.  Use Pop to avoid modifying history
    // Note we don't do any handling of lazy here.  For SPA's it'll get handled
    // in the normal navigation flow.  For SSR it's expected that lazy modules are
    // resolved prior to router creation since we can't go into a fallbackElement
    // UI for SSR'd apps
    if (!state.initialized) {
      startNavigation(Action.Pop, state.location, {
        initialHydration: true
      });
    }
    return router;
  }
  // Clean up a router and it's side effects
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    if (removePageHideEventListener) {
      removePageHideEventListener();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  // Subscribe to state updates for the router
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  // Update our state and notify the calling context of the change
  function updateState(newState, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state = _extends({}, state, newState);
    // Prep fetcher cleanup so we can tell the UI which fetcher data entries
    // can be removed
    let completedFetchers = [];
    let deletedFetchersKeys = [];
    if (future.v7_fetcherPersist) {
      state.fetchers.forEach((fetcher, key) => {
        if (fetcher.state === "idle") {
          if (deletedFetchers.has(key)) {
            // Unmounted from the UI and can be totally removed
            deletedFetchersKeys.push(key);
          } else {
            // Returned to idle but still mounted in the UI, so semi-remains for
            // revalidations and such
            completedFetchers.push(key);
          }
        }
      });
    }
    // Remove any lingering deleted fetchers that have already been removed
    // from state.fetchers
    deletedFetchers.forEach(key => {
      if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
        deletedFetchersKeys.push(key);
      }
    });
    // Iterate over a local copy so that if flushSync is used and we end up
    // removing and adding a new subscriber due to the useCallback dependencies,
    // we don't get ourselves into a loop calling the new subscriber immediately
    [...subscribers].forEach(subscriber => subscriber(state, {
      deletedFetchers: deletedFetchersKeys,
      viewTransitionOpts: opts.viewTransitionOpts,
      flushSync: opts.flushSync === true
    }));
    // Remove idle fetchers from state since we only care about in-flight fetchers.
    if (future.v7_fetcherPersist) {
      completedFetchers.forEach(key => state.fetchers.delete(key));
      deletedFetchersKeys.forEach(key => deleteFetcher(key));
    } else {
      // We already called deleteFetcher() on these, can remove them from this
      // Set now that we've handed the keys off to the data layer
      deletedFetchersKeys.forEach(key => deletedFetchers.delete(key));
    }
  }
  // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState
  function completeNavigation(location, newState, _temp) {
    var _location$state, _location$state2;
    let {
      flushSync
    } = _temp === void 0 ? {} : _temp;
    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a mutation submission
    // - We're past the submitting state and into the loading state
    // - The location being loaded is not the result of a redirect
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        // Empty actionData -> clear prior actionData due to an action error
        actionData = null;
      }
    } else if (isActionReload) {
      // Keep the current data if we're wrapping up the action reload
      actionData = state.actionData;
    } else {
      // Clear actionData on any other completed navigations
      actionData = null;
    }
    // Always preserve any existing loaderData from re-used routes
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    // On a successful navigation we can assume we got through all blockers
    // so we can start fresh
    let blockers = state.blockers;
    if (blockers.size > 0) {
      blockers = new Map(blockers);
      blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
    }
    // Always respect the user flag.  Otherwise don't reset on mutation
    // submission navigations unless they redirect
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    // Commit any in-flight routes at the end of the HMR revalidation "navigation"
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = undefined;
    }
    if (isUninterruptedRevalidation) ; else if (pendingAction === Action.Pop) ; else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    }
    let viewTransitionOpts;
    // On POP, enable transitions if they were enabled on the original navigation
    if (pendingAction === Action.Pop) {
      // Forward takes precedence so they behave like the original navigation
      let priorPaths = appliedViewTransitions.get(state.location.pathname);
      if (priorPaths && priorPaths.has(location.pathname)) {
        viewTransitionOpts = {
          currentLocation: state.location,
          nextLocation: location
        };
      } else if (appliedViewTransitions.has(location.pathname)) {
        // If we don't have a previous forward nav, assume we're popping back to
        // the new location and enable if that location previously enabled
        viewTransitionOpts = {
          currentLocation: location,
          nextLocation: state.location
        };
      }
    } else if (pendingViewTransitionEnabled) {
      // Store the applied transition on PUSH/REPLACE
      let toPaths = appliedViewTransitions.get(state.location.pathname);
      if (toPaths) {
        toPaths.add(location.pathname);
      } else {
        toPaths = new Set([location.pathname]);
        appliedViewTransitions.set(state.location.pathname, toPaths);
      }
      viewTransitionOpts = {
        currentLocation: state.location,
        nextLocation: location
      };
    }
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers
    }), {
      viewTransitionOpts,
      flushSync: flushSync === true
    });
    // Reset stateful navigation vars
    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    pendingViewTransitionEnabled = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
  }
  // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
    // URL from window.location, so we need to encode it here so the behavior
    // remains the same as POP and non-data-router usages.  new URL() does all
    // the same encoding we'd get from a history.pushState/window.location read
    // without having to touch history
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : undefined;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false) ; else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      // By default on submissions to the current location we REPLACE so that
      // users don't have to double-click the back button to get to the prior
      // location.  If the user redirects to a different location from the
      // action/loader this will be ignored and the redirect will be a PUSH
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;
    let flushSync = (opts && opts.flushSync) === true;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      // Put the blocker into a blocked state
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: undefined,
            reset: undefined,
            location: nextLocation
          });
          // Send the same navigation through
          navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER);
          updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace,
      enableViewTransition: opts && opts.viewTransition,
      flushSync
    });
  }
  // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    });
    // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders
    if (state.navigation.state === "submitting") {
      return;
    }
    // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    }
    // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes
    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation,
      // Proxy through any rending view transition
      enableViewTransition: pendingViewTransitionEnabled === true
    });
  }
  // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation
  async function startNavigation(historyAction, location, opts) {
    // Abort any in-progress navigations and start a new one. Unset any ongoing
    // uninterrupted revalidations unless told otherwise, since we want this
    // new navigation to update history normally
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    // Save the current scroll position every time we start a new navigation,
    // and track whether we should reset scroll on completion
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = opts != null && opts.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ?
    // `matchRoutes()` has already been called if we're in here via `router.initialize()`
    state.matches : matchRoutes(routesToUse, location, basename);
    let flushSync = (opts && opts.flushSync) === true;
    // Short circuit if it's only a hash change and not a revalidation or
    // mutation submission.
    //
    // Ignore on initial page loads because since the initial hydration will always
    // be "same hash".  For example, on /page#hash and submit a <Form method="post">
    // which will default to a navigation to /page
    if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      }, {
        flushSync
      });
      return;
    }
    let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    // Short circuit with a 404 on the root error boundary if we match nothing
    if (!matches) {
      let {
        error,
        notFoundMatches,
        route
      } = handleNavigational404(location.pathname);
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      }, {
        flushSync
      });
      return;
    }
    // Create a controller/Request for this navigation
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionResult;
    if (opts && opts.pendingError) {
      // If we have a pendingError, it means the user attempted a GET submission
      // with binary FormData so assign here and skip to handleLoaders.  That
      // way we handle calling loaders above the boundary etc.  It's not really
      // different from an actionError in that sense.
      pendingActionResult = [findNearestBoundary(matches).route.id, {
        type: ResultType.error,
        error: opts.pendingError
      }];
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      // Call action if we received an action submission
      let actionResult = await handleAction(request, location, opts.submission, matches, fogOfWar.active, {
        replace: opts.replace,
        flushSync
      });
      if (actionResult.shortCircuited) {
        return;
      }
      // If we received a 404 from handleAction, it's because we couldn't lazily
      // discover the destination route so we don't want to call loaders
      if (actionResult.pendingActionResult) {
        let [routeId, result] = actionResult.pendingActionResult;
        if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
          pendingNavigationController = null;
          completeNavigation(location, {
            matches: actionResult.matches,
            loaderData: {},
            errors: {
              [routeId]: result.error
            }
          });
          return;
        }
      }
      matches = actionResult.matches || matches;
      pendingActionResult = actionResult.pendingActionResult;
      loadingNavigation = getLoadingNavigation(location, opts.submission);
      flushSync = false;
      // No need to do fog of war matching again on loader execution
      fogOfWar.active = false;
      // Create a GET request for the loaders
      request = createClientSideRequest(init.history, request.url, request.signal);
    }
    // Call loaders
    let {
      shortCircuited,
      matches: updatedMatches,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
    if (shortCircuited) {
      return;
    }
    // Clean up now that the action/loaders have completed.  Don't clean up if
    // we short circuited because pendingNavigationController will have already
    // been assigned to a new controller for the next navigation
    pendingNavigationController = null;
    completeNavigation(location, _extends({
      matches: updatedMatches || matches
    }, getActionDataForCommit(pendingActionResult), {
      loaderData,
      errors
    }));
  }
  // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors
  async function handleAction(request, location, submission, matches, isFogOfWar, opts) {
    if (opts === void 0) {
      opts = {};
    }
    interruptActiveLoads();
    // Put us in a submitting state
    let navigation = getSubmittingNavigation(location, submission);
    updateState({
      navigation
    }, {
      flushSync: opts.flushSync === true
    });
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          pendingActionResult: [boundaryId, {
            type: ResultType.error,
            error: discoverResult.error
          }]
        };
      } else if (!discoverResult.matches) {
        let {
          notFoundMatches,
          error,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          pendingActionResult: [route.id, {
            type: ResultType.error,
            error
          }]
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    // Call our action and get the result
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      let results = await callDataStrategy("action", state, request, [actionMatch], matches, null);
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace;
      if (opts && opts.replace != null) {
        replace = opts.replace;
      } else {
        // If the user didn't explicity indicate replace behavior, replace if
        // we redirected to the exact same location we're currently at to avoid
        // double back-buttons
        let location = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
        replace = location === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(request, result, true, {
        submission,
        replace
      });
      return {
        shortCircuited: true
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      // By default, all submissions to the current location are REPLACE
      // navigations, but if the action threw an error that'll be rendered in
      // an errorElement, we fall back to PUSH so that the user can use the
      // back button to get back to the pre-submission form location to try
      // again
      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        matches,
        pendingActionResult: [boundaryMatch.route.id, result]
      };
    }
    return {
      matches,
      pendingActionResult: [actionMatch.route.id, result]
    };
  }
  // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.
  async function handleLoaders(request, location, matches, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
    // Figure out the right navigation we want to use for data loading
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
    // If this was a redirect from an action we don't have a "submission" but
    // we have it on the loading navigation so use that if available
    let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
    // If this is an uninterrupted revalidation, we remain in our current idle
    // state.  If not, we need to switch to our loading state and load data,
    // preserving any new action data or existing action data (in the case of
    // a revalidation interrupting an actionReload)
    // If we have partialHydration enabled, then don't update the state for the
    // initial data load since it's not a "navigation"
    let shouldUpdateNavigationState = !isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration);
    // When fog of war is enabled, we enter our `loading` state earlier so we
    // can discover new routes during the `loading` state.  We skip this if
    // we've already run actions since we would have done our matching already.
    // If the children() function threw then, we want to proceed with the
    // partial matches it discovered.
    if (isFogOfWar) {
      if (shouldUpdateNavigationState) {
        let actionData = getUpdatedActionData(pendingActionResult);
        updateState(_extends({
          navigation: loadingNavigation
        }, actionData !== undefined ? {
          actionData
        } : {}), {
          flushSync
        });
      }
      let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
      if (discoverResult.type === "aborted") {
        return {
          shortCircuited: true
        };
      } else if (discoverResult.type === "error") {
        let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
        return {
          matches: discoverResult.partialMatches,
          loaderData: {},
          errors: {
            [boundaryId]: discoverResult.error
          }
        };
      } else if (!discoverResult.matches) {
        let {
          error,
          notFoundMatches,
          route
        } = handleNavigational404(location.pathname);
        return {
          matches: notFoundMatches,
          loaderData: {},
          errors: {
            [route.id]: error
          }
        };
      } else {
        matches = discoverResult.matches;
      }
    }
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
    // Cancel pending deferreds for no-longer-matched routes or routes we're
    // about to reload.  Note that if this is an action reload we would have
    // already cancelled all pending deferreds so this would be a no-op
    cancelActiveDeferreds(routeId => !(matches && matches.some(m => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some(m => m.route.id === routeId));
    pendingNavigationLoadId = ++incrementingLoadId;
    // Short circuit if we have no loaders to run
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers = markFetchRedirectsDone();
      completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null
      }, getActionDataForCommit(pendingActionResult), updatedFetchers ? {
        fetchers: new Map(state.fetchers)
      } : {}), {
        flushSync
      });
      return {
        shortCircuited: true
      };
    }
    if (shouldUpdateNavigationState) {
      let updates = {};
      if (!isFogOfWar) {
        // Only update navigation/actionNData if we didn't already do it above
        updates.navigation = loadingNavigation;
        let actionData = getUpdatedActionData(pendingActionResult);
        if (actionData !== undefined) {
          updates.actionData = actionData;
        }
      }
      if (revalidatingFetchers.length > 0) {
        updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
      }
      updateState(updates, {
        flushSync
      });
    }
    revalidatingFetchers.forEach(rf => {
      abortFetcher(rf.key);
      if (rf.controller) {
        // Fetchers use an independent AbortController so that aborting a fetcher
        // (via deleteFetcher) does not abort the triggering navigation that
        // triggered the revalidation
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    // Proxy navigation abort through to revalidation fetchers
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(f => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    }
    // Clean up _after_ loaders have completed.  Don't clean up if we short
    // circuited because fetchControllers would have been aborted and
    // reassigned to new controllers for the next navigation
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }
    revalidatingFetchers.forEach(rf => fetchControllers.delete(rf.key));
    // If any loaders returned a redirect Response, start a new REPLACE navigation
    let redirect = findRedirect(loaderResults);
    if (redirect) {
      await startRedirectNavigation(request, redirect.result, true, {
        replace
      });
      return {
        shortCircuited: true
      };
    }
    redirect = findRedirect(fetcherResults);
    if (redirect) {
      // If this redirect came from a fetcher make sure we mark it in
      // fetchRedirectIds so it doesn't get revalidated on the next set of
      // loader executions
      fetchRedirectIds.add(redirect.key);
      await startRedirectNavigation(request, redirect.result, true, {
        replace
      });
      return {
        shortCircuited: true
      };
    }
    // Process and commit output from loaders
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
    // Wire up subscribers to update loaderData as promises settle
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe(aborted => {
        // Note: No need to updateState here since the TrackedPromise on
        // loaderData is stable across resolve/reject
        // Remove this instance if we were aborted or if promises have settled
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    // Preserve SSR errors during partial hydration
    if (future.v7_partialHydration && initialHydration && state.errors) {
      errors = _extends({}, state.errors, errors);
    }
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      matches,
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getUpdatedActionData(pendingActionResult) {
    if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
      // This is cast to `any` currently because `RouteData`uses any and it
      // would be a breaking change to use any.
      // TODO: v7 - change `RouteData` to use `unknown` instead of `any`
      return {
        [pendingActionResult[0]]: pendingActionResult[1].data
      };
    } else if (state.actionData) {
      if (Object.keys(state.actionData).length === 0) {
        return null;
      } else {
        return state.actionData;
      }
    }
  }
  function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
    revalidatingFetchers.forEach(rf => {
      let fetcher = state.fetchers.get(rf.key);
      let revalidatingFetcher = getLoadingFetcher(undefined, fetcher ? fetcher.data : undefined);
      state.fetchers.set(rf.key, revalidatingFetcher);
    });
    return new Map(state.fetchers);
  }
  // Trigger a fetcher load/submit for the given fetcher key
  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }
    abortFetcher(key);
    let flushSync = (opts && opts.flushSync) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
    if (fogOfWar.active && fogOfWar.matches) {
      matches = fogOfWar.matches;
    }
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }), {
        flushSync
      });
      return;
    }
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error, {
        flushSync
      });
      return;
    }
    let match = getTargetMatch(matches, path);
    let preventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, fogOfWar.active, flushSync, preventScrollReset, submission);
      return;
    }
    // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations
    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, fogOfWar.active, flushSync, preventScrollReset, submission);
  }
  // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation
  async function handleFetcherAction(key, routeId, path, match, requestMatches, isFogOfWar, flushSync, preventScrollReset, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    function detectAndHandle405Error(m) {
      if (!m.route.action && !m.route.lazy) {
        let error = getInternalRouterError(405, {
          method: submission.formMethod,
          pathname: path,
          routeId: routeId
        });
        setFetcherError(key, routeId, error, {
          flushSync
        });
        return true;
      }
      return false;
    }
    if (!isFogOfWar && detectAndHandle405Error(match)) {
      return;
    }
    // Put this fetcher into it's submitting state
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(requestMatches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, {
          flushSync
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync
        });
        return;
      } else {
        requestMatches = discoverResult.matches;
        match = getTargetMatch(requestMatches, path);
        if (detectAndHandle405Error(match)) {
          return;
        }
      }
    }
    // Call the action for the fetcher
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let actionResults = await callDataStrategy("action", state, fetchRequest, [match], requestMatches, key);
    let actionResult = actionResults[match.route.id];
    if (fetchRequest.signal.aborted) {
      // We can delete this so long as we weren't aborted by our own fetcher
      // re-submit which would have put _new_ controller is in fetchControllers
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    // When using v7_fetcherPersist, we don't want errors bubbling up to the UI
    // or redirects processed for unmounted fetchers so we just revert them to
    // idle
    if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
      if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
        updateFetcherState(key, getDoneFetcher(undefined));
        return;
      }
      // Let SuccessResult's fall through for revalidation
    } else {
      if (isRedirectResult(actionResult)) {
        fetchControllers.delete(key);
        if (pendingNavigationLoadId > originatingLoadId) {
          // A new navigation was kicked off after our action started, so that
          // should take precedence over this redirect navigation.  We already
          // set isRevalidationRequired so all loaders for the new route should
          // fire unless opted out via shouldRevalidate
          updateFetcherState(key, getDoneFetcher(undefined));
          return;
        } else {
          fetchRedirectIds.add(key);
          updateFetcherState(key, getLoadingFetcher(submission));
          return startRedirectNavigation(fetchRequest, actionResult, false, {
            fetcherSubmission: submission,
            preventScrollReset
          });
        }
      }
      // Process any non-redirect errors thrown
      if (isErrorResult(actionResult)) {
        setFetcherError(key, routeId, actionResult.error);
        return;
      }
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    // Start the data load for current matches, or the next location if we're
    // in the middle of a navigation
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
    // Put all revalidating fetchers into the loading state, except for the
    // current fetcher which we want to keep in it's current loading state which
    // contains it's action submission info + action data
    revalidatingFetchers.filter(rf => rf.key !== key).forEach(rf => {
      let staleKey = rf.key;
      let existingFetcher = state.fetchers.get(staleKey);
      let revalidatingFetcher = getLoadingFetcher(undefined, existingFetcher ? existingFetcher.data : undefined);
      state.fetchers.set(staleKey, revalidatingFetcher);
      abortFetcher(staleKey);
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(rf => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach(r => fetchControllers.delete(r.key));
    let redirect = findRedirect(loaderResults);
    if (redirect) {
      return startRedirectNavigation(revalidationRequest, redirect.result, false, {
        preventScrollReset
      });
    }
    redirect = findRedirect(fetcherResults);
    if (redirect) {
      // If this redirect came from a fetcher make sure we mark it in
      // fetchRedirectIds so it doesn't get revalidated on the next set of
      // loader executions
      fetchRedirectIds.add(redirect.key);
      return startRedirectNavigation(revalidationRequest, redirect.result, false, {
        preventScrollReset
      });
    }
    // Process and commit output from loaders
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds);
    // Since we let revalidations complete even if the submitting fetcher was
    // deleted, only put it back to idle if it hasn't been deleted
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    abortStaleFetchLoads(loadId);
    // If we are currently in a navigation loading state and this fetcher is
    // more recent than the navigation, we want the newer data so abort the
    // navigation and complete it with the fetcher data
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      // otherwise just update with the fetcher data, preserving any existing
      // loaderData for loaders that did not need to reload.  We have to
      // manually merge here since we aren't going through completeNavigation
      updateState({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
        fetchers: new Map(state.fetchers)
      });
      isRevalidationRequired = false;
    }
  }
  // Call the matched loader for fetcher.load(), handling redirects, errors, etc.
  async function handleFetcherLoader(key, routeId, path, match, matches, isFogOfWar, flushSync, preventScrollReset, submission) {
    let existingFetcher = state.fetchers.get(key);
    updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : undefined), {
      flushSync
    });
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    if (isFogOfWar) {
      let discoverResult = await discoverRoutes(matches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
      if (discoverResult.type === "aborted") {
        return;
      } else if (discoverResult.type === "error") {
        setFetcherError(key, routeId, discoverResult.error, {
          flushSync
        });
        return;
      } else if (!discoverResult.matches) {
        setFetcherError(key, routeId, getInternalRouterError(404, {
          pathname: path
        }), {
          flushSync
        });
        return;
      } else {
        matches = discoverResult.matches;
        match = getTargetMatch(matches, path);
      }
    }
    // Call the loader for this fetcher route match
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId;
    let results = await callDataStrategy("loader", state, fetchRequest, [match], matches, key);
    let result = results[match.route.id];
    // Deferred isn't supported for fetcher loads, await everything and treat it
    // as a normal load.  resolveDeferredData will return undefined if this
    // fetcher gets aborted, so we just leave result untouched and short circuit
    // below if that happens
    if (isDeferredResult(result)) {
      result = (await resolveDeferredData(result, fetchRequest.signal, true)) || result;
    }
    // We can delete this so long as we weren't aborted by our our own fetcher
    // re-load which would have put _new_ controller is in fetchControllers
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    // We don't want errors bubbling up or redirects followed for unmounted
    // fetchers, so short circuit here if it was removed from the UI
    if (deletedFetchers.has(key)) {
      updateFetcherState(key, getDoneFetcher(undefined));
      return;
    }
    // If the loader threw a redirect Response, start a new REPLACE navigation
    if (isRedirectResult(result)) {
      if (pendingNavigationLoadId > originatingLoadId) {
        // A new navigation was kicked off after our loader started, so that
        // should take precedence over this redirect navigation
        updateFetcherState(key, getDoneFetcher(undefined));
        return;
      } else {
        fetchRedirectIds.add(key);
        await startRedirectNavigation(fetchRequest, result, false, {
          preventScrollReset
        });
        return;
      }
    }
    // Process any non-redirect errors thrown
    if (isErrorResult(result)) {
      setFetcherError(key, routeId, result.error);
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    // Put the fetcher back into an idle state
    updateFetcherState(key, getDoneFetcher(result.data));
  }
  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */
  async function startRedirectNavigation(request, redirect, isNavigation, _temp2) {
    let {
      submission,
      fetcherSubmission,
      preventScrollReset,
      replace
    } = _temp2 === void 0 ? {} : _temp2;
    if (redirect.response.headers.has("X-Remix-Revalidate")) {
      isRevalidationRequired = true;
    }
    let location = redirect.response.headers.get("Location");
    invariant(location, "Expected a Location header on the redirect Response");
    location = normalizeRedirectLocation(location, new URL(request.url), basename);
    let redirectLocation = createLocation(state.location, location, {
      _isRedirect: true
    });
    if (isBrowser) {
      let isDocumentReload = false;
      if (redirect.response.headers.has("X-Remix-Reload-Document")) {
        // Hard reload if the response contained X-Remix-Reload-Document
        isDocumentReload = true;
      } else if (ABSOLUTE_URL_REGEX.test(location)) {
        const url = init.history.createURL(location);
        isDocumentReload =
        // Hard reload if it's an absolute URL to a new origin
        url.origin !== routerWindow.location.origin ||
        // Hard reload if it's an absolute URL that does not match our basename
        stripBasename(url.pathname, basename) == null;
      }
      if (isDocumentReload) {
        if (replace) {
          routerWindow.location.replace(location);
        } else {
          routerWindow.location.assign(location);
        }
        return;
      }
    }
    // There's no need to abort on redirects, since we don't detect the
    // redirect until the action/loaders have settled
    pendingNavigationController = null;
    let redirectHistoryAction = replace === true || redirect.response.headers.has("X-Remix-Replace") ? Action.Replace : Action.Push;
    // Use the incoming submission if provided, fallback on the active one in
    // state.navigation
    let {
      formMethod,
      formAction,
      formEncType
    } = state.navigation;
    if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
      submission = getSubmissionFromNavigation(state.navigation);
    }
    // If this was a 307/308 submission we want to preserve the HTTP method and
    // re-submit the GET/POST/PUT/PATCH/DELETE as a submission navigation to the
    // redirected location
    let activeSubmission = submission || fetcherSubmission;
    if (redirectPreserveMethodStatusCodes.has(redirect.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, activeSubmission, {
          formAction: location
        }),
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : undefined
      });
    } else {
      // If we have a navigation submission, we will preserve it through the
      // redirect navigation
      let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        // Send fetcher submissions through for shouldRevalidate
        fetcherSubmission,
        // Preserve these flags across redirects
        preventScrollReset: preventScrollReset || pendingPreventScrollReset,
        enableViewTransition: isNavigation ? pendingViewTransitionEnabled : undefined
      });
    }
  }
  // Utility wrapper for calling dataStrategy client-side without having to
  // pass around the manifest, mapRouteProperties, etc.
  async function callDataStrategy(type, state, request, matchesToLoad, matches, fetcherKey) {
    let results;
    let dataResults = {};
    try {
      results = await callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties);
    } catch (e) {
      // If the outer dataStrategy method throws, just return the error for all
      // matches - and it'll naturally bubble to the root
      matchesToLoad.forEach(m => {
        dataResults[m.route.id] = {
          type: ResultType.error,
          error: e
        };
      });
      return dataResults;
    }
    for (let [routeId, result] of Object.entries(results)) {
      if (isRedirectDataStrategyResultResult(result)) {
        let response = result.result;
        dataResults[routeId] = {
          type: ResultType.redirect,
          response: normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, future.v7_relativeSplatPath)
        };
      } else {
        dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
      }
    }
    return dataResults;
  }
  async function callLoadersAndMaybeResolveData(state, matches, matchesToLoad, fetchersToLoad, request) {
    let currentMatches = state.matches;
    // Kick off loaders and fetchers in parallel
    let loaderResultsPromise = callDataStrategy("loader", state, request, matchesToLoad, matches, null);
    let fetcherResultsPromise = Promise.all(fetchersToLoad.map(async f => {
      if (f.matches && f.match && f.controller) {
        let results = await callDataStrategy("loader", state, createClientSideRequest(init.history, f.path, f.controller.signal), [f.match], f.matches, f.key);
        let result = results[f.match.route.id];
        // Fetcher results are keyed by fetcher key from here on out, not routeId
        return {
          [f.key]: result
        };
      } else {
        return Promise.resolve({
          [f.key]: {
            type: ResultType.error,
            error: getInternalRouterError(404, {
              pathname: f.path
            })
          }
        });
      }
    }));
    let loaderResults = await loaderResultsPromise;
    let fetcherResults = (await fetcherResultsPromise).reduce((acc, r) => Object.assign(acc, r), {});
    await Promise.all([resolveNavigationDeferredResults(matches, loaderResults, request.signal, currentMatches, state.loaderData), resolveFetcherDeferredResults(matches, fetcherResults, fetchersToLoad)]);
    return {
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    // Every interruption triggers a revalidation
    isRevalidationRequired = true;
    // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation
    cancelledDeferredRoutes.push(...cancelActiveDeferreds());
    // Abort in-flight fetcher loads
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.add(key);
      }
      abortFetcher(key);
    });
  }
  function updateFetcherState(key, fetcher, opts) {
    if (opts === void 0) {
      opts = {};
    }
    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function setFetcherError(key, routeId, error, opts) {
    if (opts === void 0) {
      opts = {};
    }
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    }, {
      flushSync: (opts && opts.flushSync) === true
    });
  }
  function getFetcher(key) {
    activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
    // If this fetcher was previously marked for deletion, unmark it since we
    // have a new instance
    if (deletedFetchers.has(key)) {
      deletedFetchers.delete(key);
    }
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    // Don't abort the controller if this is a deletion of a fetcher.submit()
    // in it's loading phase since - we don't want to abort the corresponding
    // revalidation and want them to complete and land
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    // If we opted into the flag we can clear this now since we're calling
    // deleteFetcher() at the end of updateState() and we've already handed the
    // deleted fetcher keys off to the data layer.
    // If not, we're eagerly calling deleteFetcher() and we need to keep this
    // Set populated until the next updateState call, and we'll clear
    // `deletedFetchers` then
    if (future.v7_fetcherPersist) {
      deletedFetchers.delete(key);
    }
    cancelledFetcherLoads.delete(key);
    state.fetchers.delete(key);
  }
  function deleteFetcherAndUpdateState(key) {
    let count = (activeFetchers.get(key) || 0) - 1;
    if (count <= 0) {
      activeFetchers.delete(key);
      deletedFetchers.add(key);
      if (!future.v7_fetcherPersist) {
        deleteFetcher(key);
      }
    } else {
      activeFetchers.set(key, count);
    }
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    if (controller) {
      controller.abort();
      fetchControllers.delete(key);
    }
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  // Utility function to update blockers, ensuring valid state transitions
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    // Poor mans state machine :)
    // https://mermaid.live/edit#pako:eNqVkc9OwzAMxl8l8nnjAYrEtDIOHEBIgwvKJTReGy3_lDpIqO27k6awMG0XcrLlnz87nwdonESogKXXBuE79rq75XZO3-yHds0RJVuv70YrPlUrCEe2HfrORS3rubqZfuhtpg5C9wk5tZ4VKcRUq88q9Z8RS0-48cE1iHJkL0ugbHuFLus9L6spZy8nX9MP2CNdomVaposqu3fGayT8T8-jJQwhepo_UtpgBQaDEUom04dZhAN1aJBDlUKJBxE1ceB2Smj0Mln-IBW5AFU2dwUiktt_2Qaq2dBfaKdEup85UV7Yd-dKjlnkabl2Pvr0DTkTreM
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker);
    updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (blockerFunctions.size === 0) {
      return;
    }
    // We ony support a single active blocker at the moment since we don't have
    // any compelling use cases for multi-blocker yet
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      // If the blocker is currently proceeding, we don't need to re-check
      // it and can let this navigation continue
      return;
    }
    // At this point, we know we're unblocked/blocked so we need to check the
    // user-provided blocker function
    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function handleNavigational404(pathname) {
    let error = getInternalRouterError(404, {
      pathname
    });
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let {
      matches,
      route
    } = getShortCircuitMatches(routesToUse);
    // Cancel all pending deferred on 404s since we don't keep any routes
    cancelActiveDeferreds();
    return {
      notFoundMatches: matches,
      route,
      error
    };
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  }
  // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || null;
    // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    if (getScrollRestorationKey) {
      let key = getScrollRestorationKey(location, matches.map(m => convertRouteMatchToUiMatch(m, state.loaderData)));
      return key || location.key;
    }
    return location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions) {
      let key = getScrollKey(location, matches);
      let y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function checkFogOfWar(matches, routesToUse, pathname) {
    if (patchRoutesOnNavigationImpl) {
      if (!matches) {
        let fogMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
        return {
          active: true,
          matches: fogMatches || []
        };
      } else {
        if (Object.keys(matches[0].params).length > 0) {
          // If we matched a dynamic param or a splat, it might only be because
          // we haven't yet discovered other routes that would match with a
          // higher score.  Call patchRoutesOnNavigation just to be sure
          let partialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
          return {
            active: true,
            matches: partialMatches
          };
        }
      }
    }
    return {
      active: false,
      matches: null
    };
  }
  async function discoverRoutes(matches, pathname, signal, fetcherKey) {
    if (!patchRoutesOnNavigationImpl) {
      return {
        type: "success",
        matches
      };
    }
    let partialMatches = matches;
    while (true) {
      let isNonHMR = inFlightDataRoutes == null;
      let routesToUse = inFlightDataRoutes || dataRoutes;
      let localManifest = manifest;
      try {
        await patchRoutesOnNavigationImpl({
          signal,
          path: pathname,
          matches: partialMatches,
          fetcherKey,
          patch: (routeId, children) => {
            if (signal.aborted) return;
            patchRoutesImpl(routeId, children, routesToUse, localManifest, mapRouteProperties);
          }
        });
      } catch (e) {
        return {
          type: "error",
          error: e,
          partialMatches
        };
      } finally {
        // If we are not in the middle of an HMR revalidation and we changed the
        // routes, provide a new identity so when we `updateState` at the end of
        // this navigation/fetch `router.routes` will be a new identity and
        // trigger a re-run of memoized `router.routes` dependencies.
        // HMR will already update the identity and reflow when it lands
        // `inFlightDataRoutes` in `completeNavigation`
        if (isNonHMR && !signal.aborted) {
          dataRoutes = [...dataRoutes];
        }
      }
      if (signal.aborted) {
        return {
          type: "aborted"
        };
      }
      let newMatches = matchRoutes(routesToUse, pathname, basename);
      if (newMatches) {
        return {
          type: "success",
          matches: newMatches
        };
      }
      let newPartialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
      // Avoid loops if the second pass results in the same partial matches
      if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every((m, i) => m.route.id === newPartialMatches[i].route.id)) {
        return {
          type: "success",
          matches: null
        };
      }
      partialMatches = newPartialMatches;
    }
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, undefined, manifest);
  }
  function patchRoutes(routeId, children) {
    let isNonHMR = inFlightDataRoutes == null;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties);
    // If we are not in the middle of an HMR revalidation and we changed the
    // routes, provide a new identity and trigger a reflow via `updateState`
    // to re-run memoized `router.routes` dependencies.
    // HMR will already update the identity and reflow when it lands
    // `inFlightDataRoutes` in `completeNavigation`
    if (isNonHMR) {
      dataRoutes = [...dataRoutes];
      updateState({});
    }
  }
  router = {
    get basename() {
      return basename;
    },
    get future() {
      return future;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return routerWindow;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: to => init.history.createHref(to),
    encodeLocation: to => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher: deleteFetcherAndUpdateState,
    dispose,
    getBlocker,
    deleteBlocker,
    patchRoutes,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router;
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////
const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties;
  if (opts != null && opts.mapRouteProperties) {
    mapRouteProperties = opts.mapRouteProperties;
  } else if (opts != null && opts.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  // Config driven behavior flags
  let future = _extends({
    v7_relativeSplatPath: false,
    v7_throwAbortReason: false
  }, opts ? opts.future : null);
  let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, undefined, manifest);
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   *
   * - `opts.requestContext` is an optional server context that will be passed
   *   to actions/loaders in the `context` parameter
   * - `opts.skipLoaderErrorBubbling` is an optional parameter that will prevent
   *   the bubbling of errors which allows single-fetch-type implementations
   *   where the client will handle the bubbling and we may need to return data
   *   for the handling route
   */
  async function query(request, _temp3) {
    let {
      requestContext,
      skipLoaderErrorBubbling,
      dataStrategy
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    // SSR supports HEAD requests while SPA doesn't
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext, dataStrategy || null, skipLoaderErrorBubbling === true, null);
    if (isResponse(result)) {
      return result;
    }
    // When returning StaticHandlerContext, we patch back in the location here
    // since we need it for React Context.  But this helps keep our submit and
    // loadRouteData operating on a Request instead of a Location
    return _extends({
      location,
      basename
    }, result);
  }
  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   *
   * - `opts.routeId` allows you to specify the specific route handler to call.
   *   If not provided the handler will determine the proper route by matching
   *   against `request.url`
   * - `opts.requestContext` is an optional server context that will be passed
   *    to actions/loaders in the `context` parameter
   */
  async function queryRoute(request, _temp4) {
    let {
      routeId,
      requestContext,
      dataStrategy
    } = _temp4 === void 0 ? {} : _temp4;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    // SSR supports HEAD requests while SPA doesn't
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let match = routeId ? matches.find(m => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      // This should never hit I don't think?
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let result = await queryImpl(request, location, matches, requestContext, dataStrategy || null, false, match);
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : undefined;
    if (error !== undefined) {
      // If we got back result.errors, that means the loader/action threw
      // _something_ that wasn't a Response, but it's not guaranteed/required
      // to be an `instanceof Error` either, so we have to use throw here to
      // preserve the "error" state outside of queryImpl.
      throw error;
    }
    // Pick off the right state value to return
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }
      return data;
    }
    return undefined;
  }
  async function queryImpl(request, location, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch != null);
        return result;
      }
      let result = await loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      // If the user threw/returned a Response in callLoaderOrAction for a
      // `queryRoute` call, we throw the `DataStrategyResult` to bail out early
      // and then return or throw the raw Response here accordingly
      if (isDataStrategyResult(e) && isResponse(e.result)) {
        if (e.type === ResultType.error) {
          throw e.result;
        }
        return e.result;
      }
      // Redirects are always returned since they don't propagate to catch
      // boundaries
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    } else {
      let results = await callDataStrategy("action", request, [actionMatch], matches, isRouteRequest, requestContext, dataStrategy);
      result = results[actionMatch.route.id];
      if (request.signal.aborted) {
        throwStaticHandlerAbortedError(request, isRouteRequest, future);
      }
    }
    if (isRedirectResult(result)) {
      // Uhhhh - this should never happen, we should always throw these from
      // callLoaderOrAction, but the type narrowing here keeps TS happy and we
      // can get back on the "throw all redirect responses" train here should
      // this ever happen :/
      throw new Response(null, {
        status: result.response.status,
        headers: {
          Location: result.response.headers.get("Location")
        }
      });
    }
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      // Note: This should only be non-Response values if we get here, since
      // isRouteRequest should throw any Response received in callLoaderOrAction
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    // Create a GET request for the loaders
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
      let context = await loadRouteData(loaderRequest, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, null, [boundaryMatch.route.id, result]);
      // action status codes take precedence over loader status codes
      return _extends({}, context, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let context = await loadRouteData(loaderRequest, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, null);
    return _extends({}, context, {
      actionData: {
        [actionMatch.route.id]: result.data
      }
    }, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionHeaders: result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {}
    });
  }
  async function loadRouteData(request, matches, requestContext, dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
    let isRouteRequest = routeMatch != null;
    // Short circuit if we have no loaders to run (queryRoute())
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
    let matchesToLoad = requestMatches.filter(m => m.route.loader || m.route.lazy);
    // Short circuit if we have no loaders to run (query())
    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
          [pendingActionResult[0]]: pendingActionResult[1].error
        } : null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }
    let results = await callDataStrategy("loader", request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy);
    if (request.signal.aborted) {
      throwStaticHandlerAbortedError(request, isRouteRequest, future);
    }
    // Process and commit output from loaders
    let activeDeferreds = new Map();
    let context = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling);
    // Add a null for any non-loader matches for proper revalidation on the client
    let executedLoaders = new Set(matchesToLoad.map(match => match.route.id));
    matches.forEach(match => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  // Utility wrapper for calling dataStrategy server-side without having to
  // pass around the manifest, mapRouteProperties, etc.
  async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, dataStrategy) {
    let results = await callDataStrategyImpl(dataStrategy || defaultDataStrategy, type, null, request, matchesToLoad, matches, null, manifest, mapRouteProperties, requestContext);
    let dataResults = {};
    await Promise.all(matches.map(async match => {
      if (!(match.route.id in results)) {
        return;
      }
      let result = results[match.route.id];
      if (isRedirectDataStrategyResultResult(result)) {
        let response = result.result;
        // Throw redirects and let the server handle them with an HTTP redirect
        throw normalizeRelativeRoutingRedirectResponse(response, request, match.route.id, matches, basename, future.v7_relativeSplatPath);
      }
      if (isResponse(result.result) && isRouteRequest) {
        // For SSR single-route requests, we want to hand Responses back
        // directly without unwrapping
        throw result;
      }
      dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result);
    }));
    return dataResults;
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////
/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */
function getStaticContextFromError(routes, context, error) {
  let newContext = _extends({}, context, {
    statusCode: isRouteErrorResponse(error) ? error.status : 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });
  return newContext;
}
function throwStaticHandlerAbortedError(request, isRouteRequest, future) {
  if (future.v7_throwAbortReason && request.signal.reason !== undefined) {
    throw request.signal.reason;
  }
  let method = isRouteRequest ? "queryRoute" : "query";
  throw new Error(method + "() call aborted: " + request.method + " " + request.url);
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== undefined);
}
function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId) {
    // Grab matches up to the calling route so our route-relative logic is
    // relative to the correct source route
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  // Resolve the relative path
  let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  // When `to` is not specified we inherit search/hash from the current
  // location, unlike when to="." and we just inherit the path.
  // See https://github.com/remix-run/remix/issues/927
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  // Account for `?index` params when routing to the current location
  if ((to == null || to === "" || to === ".") && activeRouteMatch) {
    let nakedIndex = hasNakedIndexQuery(path.search);
    if (activeRouteMatch.route.index && !nakedIndex) {
      // Add one when we're targeting an index route
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } else if (!activeRouteMatch.route.index && nakedIndex) {
      // Remove existing ones when we're not
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      params.delete("index");
      indexValues.filter(v => v).forEach(v => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  // If we're operating within a basename, prepend it to the pathname.  If
  // this is a root navigation, then just use the raw basename which allows
  // the basename to have full control over the presence of a trailing slash
  // on root actions
  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
// Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  // Return location verbatim on non-submission navigations
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  }
  let getInvalidBodyError = () => ({
    path,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  });
  // Create a Submission on non-GET navigations
  let rawFormMethod = opts.formMethod || "get";
  let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
  let formAction = stripHashFromPath(path);
  if (opts.body !== undefined) {
    if (opts.formEncType === "text/plain") {
      // text only support POST/PUT/PATCH/DELETE submissions
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ?
      // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
      Array.from(opts.body.entries()).reduce((acc, _ref3) => {
        let [name, value] = _ref3;
        return "" + acc + name + "=" + value + "\n";
      }, "") : String(opts.body);
      return {
        path,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: undefined,
          json: undefined,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      // json only supports POST/PUT/PATCH/DELETE submissions
      if (!isMutationMethod(formMethod)) {
        return getInvalidBodyError();
      }
      try {
        let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: undefined,
            json,
            text: undefined
          }
        };
      } catch (e) {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData === "function", "FormData is not available in this environment");
  let searchParams;
  let formData;
  if (opts.formData) {
    searchParams = convertFormDataToSearchParams(opts.formData);
    formData = opts.formData;
  } else if (opts.body instanceof FormData) {
    searchParams = convertFormDataToSearchParams(opts.body);
    formData = opts.body;
  } else if (opts.body instanceof URLSearchParams) {
    searchParams = opts.body;
    formData = convertSearchParamsToFormData(searchParams);
  } else if (opts.body == null) {
    searchParams = new URLSearchParams();
    formData = new FormData();
  } else {
    try {
      searchParams = new URLSearchParams(opts.body);
      formData = convertSearchParamsToFormData(searchParams);
    } catch (e) {
      return getInvalidBodyError();
    }
  }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: undefined,
    text: undefined
  };
  if (isMutationMethod(submission.formMethod)) {
    return {
      path,
      submission
    };
  }
  // Flatten submission onto URLSearchParams for GET submissions
  let parsedPath = parsePath(path);
  // On GET navigation submissions we can drop the ?index param from the
  // resulting location since all loaders will run.  But fetcher GET submissions
  // only run a single loader so we need to preserve any incoming ?index params
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
}
// Filter out all routes at/below any caught error as they aren't going to
// render so we don't need to load them
function getLoaderMatchesUntilBoundary(matches, boundaryId, includeBoundary) {
  if (includeBoundary === void 0) {
    includeBoundary = false;
  }
  let index = matches.findIndex(m => m.route.id === boundaryId);
  if (index >= 0) {
    return matches.slice(0, includeBoundary ? index + 1 : index);
  }
  return matches;
}
function getMatchesToLoad(history, state, matches, submission, location, initialHydration, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
  let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : undefined;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  // Pick navigation matches that are net-new or qualify for revalidation
  let boundaryMatches = matches;
  if (initialHydration && state.errors) {
    // On initial hydration, only consider matches up to _and including_ the boundary.
    // This is inclusive to handle cases where a server loader ran successfully,
    // a child server loader bubbled up to this route, but this route has
    // `clientLoader.hydrate` so we want to still run the `clientLoader` so that
    // we have a complete version of `loaderData`
    boundaryMatches = getLoaderMatchesUntilBoundary(matches, Object.keys(state.errors)[0], true);
  } else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
    // If an action threw an error, we call loaders up to, but not including the
    // boundary
    boundaryMatches = getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]);
  }
  // Don't revalidate loaders by default after action 4xx/5xx responses
  // when the flag is enabled.  They can still opt-into revalidation via
  // `shouldRevalidate` via `actionResult`
  let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : undefined;
  let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
  let navigationMatches = boundaryMatches.filter((match, index) => {
    let {
      route
    } = match;
    if (route.lazy) {
      // We haven't loaded this route yet so we don't know if it's got a loader!
      return true;
    }
    if (route.loader == null) {
      return false;
    }
    if (initialHydration) {
      return shouldLoadRouteOnHydration(route, state.loaderData, state.errors);
    }
    // Always call the loader on new route instances and pending defer cancellations
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some(id => id === match.route.id)) {
      return true;
    }
    // This is the default implementation for when we revalidate.  If the route
    // provides it's own implementation, then we give them full control but
    // provide this value so they can leverage it if needed after they check
    // their own specific use cases
    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      actionStatus,
      defaultShouldRevalidate: shouldSkipRevalidation ? false :
      // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search ||
      // Search params affect all loaders
      currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  });
  // Pick fetcher.loads that need to be revalidated
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    // Don't revalidate:
    //  - on initial hydration (shouldn't be any fetchers then anyway)
    //  - if fetcher won't be present in the subsequent render
    //    - no longer matches the URL (v7_fetcherPersist=false)
    //    - was unmounted but persisted due to v7_fetcherPersist=true
    if (initialHydration || !matches.some(m => m.route.id === f.routeId) || deletedFetchers.has(key)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    // If the fetcher path no longer matches, push it in with null matches so
    // we can trigger a 404 in callLoadersAndMaybeResolveData.  Note this is
    // currently only a use-case for Remix HMR where the route tree can change
    // at runtime and remove a route previously loaded via a fetcher
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    // Revalidating fetchers are decoupled from the route matches since they
    // load from a static href.  They revalidate based on explicit revalidation
    // (submission, useRevalidator, or X-Remix-Revalidate)
    let fetcher = state.fetchers.get(key);
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    let shouldRevalidate = false;
    if (fetchRedirectIds.has(key)) {
      // Never trigger a revalidation of an actively redirecting fetcher
      shouldRevalidate = false;
    } else if (cancelledFetcherLoads.has(key)) {
      // Always mark for revalidation if the fetcher was cancelled
      cancelledFetcherLoads.delete(key);
      shouldRevalidate = true;
    } else if (fetcher && fetcher.state !== "idle" && fetcher.data === undefined) {
      // If the fetcher hasn't ever completed loading yet, then this isn't a
      // revalidation, it would just be a brand new load if an explicit
      // revalidation is required
      shouldRevalidate = isRevalidationRequired;
    } else {
      // Otherwise fall back on any user-defined shouldRevalidate, defaulting
      // to explicit revalidations only
      shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
        currentUrl,
        currentParams: state.matches[state.matches.length - 1].params,
        nextUrl,
        nextParams: matches[matches.length - 1].params
      }, submission, {
        actionResult,
        actionStatus,
        defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
      }));
    }
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function shouldLoadRouteOnHydration(route, loaderData, errors) {
  // We dunno if we have a loader - gotta find out!
  if (route.lazy) {
    return true;
  }
  // No loader, nothing to initialize
  if (!route.loader) {
    return false;
  }
  let hasData = loaderData != null && loaderData[route.id] !== undefined;
  let hasError = errors != null && errors[route.id] !== undefined;
  // Don't run if we error'd during SSR
  if (!hasData && hasError) {
    return false;
  }
  // Explicitly opting-in to running on hydration
  if (typeof route.loader === "function" && route.loader.hydrate === true) {
    return true;
  }
  // Otherwise, run if we're not yet initialized with anything
  return !hasData && !hasError;
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew =
  // [a] -> [a, b]
  !currentMatch ||
  // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id;
  // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred
  let isMissingData = currentLoaderData[match.route.id] === undefined;
  // Always load if this is a net-new route or we don't yet have data
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname ||
    // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties) {
  var _childrenToPatch;
  let childrenToPatch;
  if (routeId) {
    let route = manifest[routeId];
    invariant(route, "No route found to patch children into: routeId = " + routeId);
    if (!route.children) {
      route.children = [];
    }
    childrenToPatch = route.children;
  } else {
    childrenToPatch = routesToUse;
  }
  // Don't patch in routes we already know about so that `patch` is idempotent
  // to simplify user-land code. This is useful because we re-call the
  // `patchRoutesOnNavigation` function for matched routes with params.
  let uniqueChildren = children.filter(newRoute => !childrenToPatch.some(existingRoute => isSameRoute(newRoute, existingRoute)));
  let newRoutes = convertRoutesToDataRoutes(uniqueChildren, mapRouteProperties, [routeId || "_", "patch", String(((_childrenToPatch = childrenToPatch) == null ? void 0 : _childrenToPatch.length) || "0")], manifest);
  childrenToPatch.push(...newRoutes);
}
function isSameRoute(newRoute, existingRoute) {
  // Most optimal check is by id
  if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
    return true;
  }
  // Second is by pathing differences
  if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) {
    return false;
  }
  // Pathless layout routes are trickier since we need to check children.
  // If they have no children then they're the same as far as we can tell
  if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) {
    return true;
  }
  // Otherwise, we look to see if every child in the new route is already
  // represented in the existing route's children
  return newRoute.children.every((aChild, i) => {
    var _existingRoute$childr;
    return (_existingRoute$childr = existingRoute.children) == null ? void 0 : _existingRoute$childr.some(bChild => isSameRoute(aChild, bChild));
  });
}
/**
 * Execute route.lazy() methods to lazily load route modules (loader, action,
 * shouldRevalidate) and update the routeManifest in place which shares objects
 * with dataRoutes so those get updated as well.
 */
async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  // If the lazy route function was executed and removed by another parallel
  // call then we can return - first lazy() to finish wins because the return
  // value of lazy is expected to be static
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  // Update the route in place.  This should be safe because there's no way
  // we could yet be sitting on this route as we can't get there without
  // resolving lazy() first.
  //
  // This is different than the HMR "update" use-case where we may actively be
  // on the route being updated.  The main concern boils down to "does this
  // mutation affect any ongoing navigations or any current state.matches
  // values?".  If not, it should be safe to update in place.
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== undefined &&
    // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, "Route \"" + routeToUpdate.id + "\" has a static property \"" + lazyRouteProperty + "\" " + "defined but its lazy function is also returning a value for this property. " + ("The lazy route property \"" + lazyRouteProperty + "\" will be ignored."));
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  // Mutate the route with the provided updates.  Do this first so we pass
  // the updated version to mapRouteProperties
  Object.assign(routeToUpdate, routeUpdates);
  // Mutate the `hasErrorBoundary` property on the route based on the route
  // updates and remove the `lazy` function so we don't resolve the lazy
  // route again.
  Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
    lazy: undefined
  }));
}
// Default implementation of `dataStrategy` which fetches all loaders in parallel
async function defaultDataStrategy(_ref4) {
  let {
    matches
  } = _ref4;
  let matchesToLoad = matches.filter(m => m.shouldLoad);
  let results = await Promise.all(matchesToLoad.map(m => m.resolve()));
  return results.reduce((acc, result, i) => Object.assign(acc, {
    [matchesToLoad[i].route.id]: result
  }), {});
}
async function callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties, requestContext) {
  let loadRouteDefinitionsPromises = matches.map(m => m.route.lazy ? loadLazyRouteModule(m.route, mapRouteProperties, manifest) : undefined);
  let dsMatches = matches.map((match, i) => {
    let loadRoutePromise = loadRouteDefinitionsPromises[i];
    let shouldLoad = matchesToLoad.some(m => m.route.id === match.route.id);
    // `resolve` encapsulates route.lazy(), executing the loader/action,
    // and mapping return values/thrown errors to a `DataStrategyResult`.  Users
    // can pass a callback to take fine-grained control over the execution
    // of the loader/action
    let resolve = async handlerOverride => {
      if (handlerOverride && request.method === "GET" && (match.route.lazy || match.route.loader)) {
        shouldLoad = true;
      }
      return shouldLoad ? callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, requestContext) : Promise.resolve({
        type: ResultType.data,
        result: undefined
      });
    };
    return _extends({}, match, {
      shouldLoad,
      resolve
    });
  });
  // Send all matches here to allow for a middleware-type implementation.
  // handler will be a no-op for unneeded routes and we filter those results
  // back out below.
  let results = await dataStrategyImpl({
    matches: dsMatches,
    request,
    params: matches[0].params,
    fetcherKey,
    context: requestContext
  });
  // Wait for all routes to load here but 'swallow the error since we want
  // it to bubble up from the `await loadRoutePromise` in `callLoaderOrAction` -
  // called from `match.resolve()`
  try {
    await Promise.all(loadRouteDefinitionsPromises);
  } catch (e) {
    // No-op
  }
  return results;
}
// Default logic for calling a loader/action is the user has no specified a dataStrategy
async function callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, staticContext) {
  let result;
  let onReject;
  let runHandler = handler => {
    // Setup a promise we can race against so that abort signals short circuit
    let reject;
    // This will never resolve so safe to type it as Promise<DataStrategyResult> to
    // satisfy the function return value
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    let actualHandler = ctx => {
      if (typeof handler !== "function") {
        return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ("\"" + type + "\" [routeId: " + match.route.id + "]")));
      }
      return handler({
        request,
        params: match.params,
        context: staticContext
      }, ...(ctx !== undefined ? [ctx] : []));
    };
    let handlerPromise = (async () => {
      try {
        let val = await (handlerOverride ? handlerOverride(ctx => actualHandler(ctx)) : actualHandler());
        return {
          type: "data",
          result: val
        };
      } catch (e) {
        return {
          type: "error",
          result: e
        };
      }
    })();
    return Promise.race([handlerPromise, abortPromise]);
  };
  try {
    let handler = match.route[type];
    // If we have a route.lazy promise, await that first
    if (loadRoutePromise) {
      if (handler) {
        // Run statically defined handler in parallel with lazy()
        let handlerError;
        let [value] = await Promise.all([
        // If the handler throws, don't let it immediately bubble out,
        // since we need to let the lazy() execution finish so we know if this
        // route has a boundary that can handle the error
        runHandler(handler).catch(e => {
          handlerError = e;
        }), loadRoutePromise]);
        if (handlerError !== undefined) {
          throw handlerError;
        }
        result = value;
      } else {
        // Load lazy route module, then run any returned handler
        await loadRoutePromise;
        handler = match.route[type];
        if (handler) {
          // Handler still runs even if we got interrupted to maintain consistency
          // with un-abortable behavior of handler execution on non-lazy or
          // previously-lazy-loaded routes
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          // lazy() route has no loader to run.  Short circuit here so we don't
          // hit the invariant below that errors on returning undefined.
          return {
            type: ResultType.data,
            result: undefined
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
    invariant(result.result !== undefined, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    // We should already be catching and converting normal handler executions to
    // DataStrategyResults and returning them, so anything that throws here is an
    // unexpected error we still need to wrap
    return {
      type: ResultType.error,
      result: e
    };
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  return result;
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
  let {
    result,
    type
  } = dataStrategyResult;
  if (isResponse(result)) {
    let data;
    try {
      let contentType = result.headers.get("Content-Type");
      // Check between word boundaries instead of startsWith() due to the last
      // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        if (result.body == null) {
          data = null;
        } else {
          data = await result.json();
        }
      } else {
        data = await result.text();
      }
    } catch (e) {
      return {
        type: ResultType.error,
        error: e
      };
    }
    if (type === ResultType.error) {
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(result.status, result.statusText, data),
        statusCode: result.status,
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (type === ResultType.error) {
    if (isDataWithResponseInit(result)) {
      var _result$init3, _result$init4;
      if (result.data instanceof Error) {
        var _result$init, _result$init2;
        return {
          type: ResultType.error,
          error: result.data,
          statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
          headers: (_result$init2 = result.init) != null && _result$init2.headers ? new Headers(result.init.headers) : undefined
        };
      }
      // Convert thrown data() to ErrorResponse instances
      return {
        type: ResultType.error,
        error: new ErrorResponseImpl(((_result$init3 = result.init) == null ? void 0 : _result$init3.status) || 500, undefined, result.data),
        statusCode: isRouteErrorResponse(result) ? result.status : undefined,
        headers: (_result$init4 = result.init) != null && _result$init4.headers ? new Headers(result.init.headers) : undefined
      };
    }
    return {
      type: ResultType.error,
      error: result,
      statusCode: isRouteErrorResponse(result) ? result.status : undefined
    };
  }
  if (isDeferredData(result)) {
    var _result$init5, _result$init6;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init5 = result.init) == null ? void 0 : _result$init5.status,
      headers: ((_result$init6 = result.init) == null ? void 0 : _result$init6.headers) && new Headers(result.init.headers)
    };
  }
  if (isDataWithResponseInit(result)) {
    var _result$init7, _result$init8;
    return {
      type: ResultType.data,
      data: result.data,
      statusCode: (_result$init7 = result.init) == null ? void 0 : _result$init7.status,
      headers: (_result$init8 = result.init) != null && _result$init8.headers ? new Headers(result.init.headers) : undefined
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
}
// Support relative routing in internal redirects
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
  let location = response.headers.get("Location");
  invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
  if (!ABSOLUTE_URL_REGEX.test(location)) {
    let trimmedMatches = matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1);
    location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
    response.headers.set("Location", location);
  }
  return response;
}
function normalizeRedirectLocation(location, currentUrl, basename) {
  if (ABSOLUTE_URL_REGEX.test(location)) {
    // Strip off the protocol+origin for same-origin + same-basename absolute redirects
    let normalizedLocation = location;
    let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
    let isSameBasename = stripBasename(url.pathname, basename) != null;
    if (url.origin === currentUrl.origin && isSameBasename) {
      return url.pathname + url.search + url.hash;
    }
  }
  return location;
}
// Utility method for creating the Request instances for loaders/actions during
// client-side navigations and fetches.  During SSR we will always have a
// Request instance from the static handler (query/queryRoute)
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    // Didn't think we needed this but it turns out unlike other methods, patch
    // won't be properly normalized to uppercase and results in a 405 error.
    // See: https://fetch.spec.whatwg.org/#concept-method
    init.method = formMethod.toUpperCase();
    if (formEncType === "application/json") {
      init.headers = new Headers({
        "Content-Type": formEncType
      });
      init.body = JSON.stringify(submission.json);
    } else if (formEncType === "text/plain") {
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      init.body = submission.text;
    } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      init.body = convertFormDataToSearchParams(submission.formData);
    } else {
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      init.body = submission.formData;
    }
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs
    searchParams.append(key, typeof value === "string" ? value : value.name);
  }
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }
  return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
  // Fill in loaderData/errors from our loaders
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : undefined;
  // Process loader results into state.loaderData/state.errors
  matches.forEach(match => {
    if (!(match.route.id in results)) {
      return;
    }
    let id = match.route.id;
    let result = results[id];
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      let error = result.error;
      // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed
      if (pendingError !== undefined) {
        error = pendingError;
        pendingError = undefined;
      }
      errors = errors || {};
      if (skipLoaderErrorBubbling) {
        errors[id] = error;
      } else {
        // Look upwards from the matched route for the closest ancestor error
        // boundary, defaulting to the root match.  Prefer higher error values
        // if lower errors bubble to the same boundary
        let boundaryMatch = findNearestBoundary(matches, id);
        if (errors[boundaryMatch.route.id] == null) {
          errors[boundaryMatch.route.id] = error;
        }
      }
      // Clear our any prior loaderData for the throwing route
      loaderData[id] = undefined;
      // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
        // Error status codes always override success status codes, but if all
        // loaders are successful we take the deepest status code.
        if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      } else {
        loaderData[id] = result.data;
        // Error status codes always override success status codes, but if all
        // loaders are successful we take the deepest status code.
        if (result.statusCode && result.statusCode !== 200 && !foundError) {
          statusCode = result.statusCode;
        }
        if (result.headers) {
          loaderHeaders[id] = result.headers;
        }
      }
    }
  });
  // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here.  Also clear out any loaderData for the
  // throwing route
  if (pendingError !== undefined && pendingActionResult) {
    errors = {
      [pendingActionResult[0]]: pendingError
    };
    loaderData[pendingActionResult[0]] = undefined;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, false // This method is only called client side so we always want to bubble
  );
  // Process results from our revalidating fetchers
  revalidatingFetchers.forEach(rf => {
    let {
      key,
      match,
      controller
    } = rf;
    let result = fetcherResults[key];
    invariant(result, "Did not find corresponding fetcher result");
    // Process fetcher non-redirect errors
    if (controller && controller.signal.aborted) {
      // Nothing to do for aborted fetchers
      return;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = getDoneFetcher(result.data);
      state.fetchers.set(key, doneFetcher);
    }
  });
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id)) {
      if (newLoaderData[id] !== undefined) {
        mergedLoaderData[id] = newLoaderData[id];
      }
    } else if (loaderData[id] !== undefined && match.route.loader) {
      // Preserve existing keys not included in newLoaderData and where a loader
      // wasn't removed by HMR
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      // Don't keep any loader data below the boundary
      break;
    }
  }
  return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
  if (!pendingActionResult) {
    return {};
  }
  return isErrorResult(pendingActionResult[1]) ? {
    // Clear out prior actionData on errors
    actionData: {}
  } : {
    actionData: {
      [pendingActionResult[0]]: pendingActionResult[1].data
    }
  };
}
// Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  // Prefer a root layout route if present, otherwise shim in a route object
  let route = routes.length === 1 ? routes[0] : routes.find(r => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp5) {
  let {
    pathname,
    routeId,
    method,
    type,
    message
  } = _temp5 === void 0 ? {} : _temp5;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    } else if (type === "invalid-body") {
      errorMessage = "Unable to encode submission body";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = "No route matches URL \"" + pathname + "\"";
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
    }
  }
  return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
// Find any returned redirect errors, starting from the lowest match
function findRedirect(results) {
  let entries = Object.entries(results);
  for (let i = entries.length - 1; i >= 0; i--) {
    let [key, result] = entries[i];
    if (isRedirectResult(result)) {
      return {
        key,
        result
      };
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    // /page -> /page#hash
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    // /page#hash -> /page#hash
    return true;
  } else if (b.hash !== "") {
    // /page#hash -> /page#other
    return true;
  }
  // If the hash is removed the browser will re-perform a request to the server
  // /page#hash -> /page
  return false;
}
function isDataStrategyResult(result) {
  return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === ResultType.data || result.type === ResultType.error);
}
function isRedirectDataStrategyResultResult(result) {
  return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDataWithResponseInit(value) {
  return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }
  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveNavigationDeferredResults(matches, results, signal, currentMatches, currentLoaderData) {
  let entries = Object.entries(results);
  for (let index = 0; index < entries.length; index++) {
    let [routeId, result] = entries[index];
    let match = matches.find(m => (m == null ? void 0 : m.route.id) === routeId);
    // If we don't have a match, then we can have a deferred result to do
    // anything with.  This is for revalidating fetchers where the route was
    // removed during HMR
    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find(m => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;
    if (isDeferredResult(result) && isRevalidatingLoader) {
      // Note: we do not have to touch activeDeferreds here since we race them
      // against the signal in resolveDeferredData and they'll get aborted
      // there if needed
      await resolveDeferredData(result, signal, false).then(result => {
        if (result) {
          results[routeId] = result;
        }
      });
    }
  }
}
async function resolveFetcherDeferredResults(matches, results, revalidatingFetchers) {
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      routeId,
      controller
    } = revalidatingFetchers[index];
    let result = results[key];
    let match = matches.find(m => (m == null ? void 0 : m.route.id) === routeId);
    // If we don't have a match, then we can have a deferred result to do
    // anything with.  This is for revalidating fetchers where the route was
    // removed during HMR
    if (!match) {
      continue;
    }
    if (isDeferredResult(result)) {
      // Note: we do not have to touch activeDeferreds here since we race them
      // against the signal in resolveDeferredData and they'll get aborted
      // there if needed
      invariant(controller, "Expected an AbortController for revalidating fetcher deferred result");
      await resolveDeferredData(result, controller.signal, true).then(result => {
        if (result) {
          results[key] = result;
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      // Handle any TrackedPromise._error values encountered while unwrapping
      return {
        type: ResultType.error,
        error: e
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(v => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  }
  // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json
  } = navigation;
  if (!formMethod || !formAction || !formEncType) {
    return;
  }
  if (text != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: undefined,
      json: undefined,
      text
    };
  } else if (formData != null) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData,
      json: undefined,
      text: undefined
    };
  } else if (json !== undefined) {
    return {
      formMethod,
      formAction,
      formEncType,
      formData: undefined,
      json,
      text: undefined
    };
  }
}
function getLoadingNavigation(location, submission) {
  if (submission) {
    let navigation = {
      state: "loading",
      location,
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text
    };
    return navigation;
  } else {
    let navigation = {
      state: "loading",
      location,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      json: undefined,
      text: undefined
    };
    return navigation;
  }
}
function getSubmittingNavigation(location, submission) {
  let navigation = {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
  return navigation;
}
function getLoadingFetcher(submission, data) {
  if (submission) {
    let fetcher = {
      state: "loading",
      formMethod: submission.formMethod,
      formAction: submission.formAction,
      formEncType: submission.formEncType,
      formData: submission.formData,
      json: submission.json,
      text: submission.text,
      data
    };
    return fetcher;
  } else {
    let fetcher = {
      state: "loading",
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      json: undefined,
      text: undefined,
      data
    };
    return fetcher;
  }
}
function getSubmittingFetcher(submission, existingFetcher) {
  let fetcher = {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : undefined
  };
  return fetcher;
}
function getDoneFetcher(data) {
  let fetcher = {
    state: "idle",
    formMethod: undefined,
    formAction: undefined,
    formEncType: undefined,
    formData: undefined,
    json: undefined,
    text: undefined,
    data
  };
  return fetcher;
}
function restoreAppliedTransitions(_window, transitions) {
  try {
    let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
    if (sessionPositions) {
      let json = JSON.parse(sessionPositions);
      for (let [k, v] of Object.entries(json || {})) {
        if (v && Array.isArray(v)) {
          transitions.set(k, new Set(v || []));
        }
      }
    }
  } catch (e) {
    // no-op, use default empty object
  }
}
function persistAppliedTransitions(_window, transitions) {
  if (transitions.size > 0) {
    let json = {};
    for (let [k, v] of transitions) {
      json[k] = [...v];
    }
    try {
      _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json));
    } catch (error) {
      warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
    }
  }
}
//#endregion


//# sourceMappingURL=router.js.map


/***/ }),

/***/ "../bpl-tools/Admin/Blocks/Block.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/Block.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");


const Block = ({
  block,
  isPremium,
  disableBlockName,
  handleCheckboxChange,
  isSaving,
  isLinks = true
}) => {
  const {
    name,
    title,
    icon,
    demo,
    docs,
    badge = '',
    required = false
  } = block;
  const isBlockPremium = !isPremium && block.isPremium;
  const disabledBlock = isBlockPremium ? false : !disableBlockName.includes(name);
  const isRequired = required === true;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `block ${!disabledBlock ? 'disabled' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "icon"
  }, icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "name"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockTitle"
  }, title), isBlockPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#pricing"
  }, "Get Pro")), isLinks && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, demo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "actionBtn",
    href: demo,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.demoIcon), docs && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "actionBtn",
    href: docs,
    target: "_blank",
    rel: "noopener noreferrer"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_1__.docsIcon)), badge && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge"
  }, badge), isBlockPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge blockProBadge"
  }, "Pro"), isRequired && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "blockBadge blockRequiredBadge"
  }, "Required"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "toggleSwitch",
    ...(isBlockPremium || isRequired ? {
      htmlFor: 'b-blocks-admin-pro-modal-toggle'
    } : {})
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: disabledBlock,
    ...(isBlockPremium || isRequired ? {} : {
      onChange: e => handleCheckboxChange(name, e.target.checked)
    }),
    disabled: isSaving || isBlockPremium || isRequired
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "slider"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);

/***/ }),

/***/ "../bpl-tools/Admin/Blocks/Toast.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/Toast.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


const Toast = ({
  message,
  type
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `bPlDashboardBlocksToast ${type}`
  }, type === 'loading' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), type === 'success' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "checkmark"
  }, "\u2713"), type === 'error' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "error-icon"
  }, "\u2715"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "message"
  }, message));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toast);

/***/ }),

/***/ "../bpl-tools/Admin/Blocks/index.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Blocks/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Blocks/style.scss");
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Block */ "../bpl-tools/Admin/Blocks/Block.js");
/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Toast */ "../bpl-tools/Admin/Blocks/Toast.js");








/**
 * Blocks Component
 * Renders a management interface for enabling/disabling plugin features/blocks.
 * Includes search, categorization, and "Activate/Deactivate All" functionality.
 *
 * @param {object} props - Component props
 * @param {boolean} props.isPremium - Whether the current user is premium
 * @param {Array} props.disabledBlocks - List of currently disabled block names
 * @param {Function} props.onChange - Callback when block status changes
 * @param {Array} props.allBlocks - Array of block definitions
 * @param {string} props.status - Saving status ('loading', 'success', 'error')
 * @param {React.Component} [props.ProModal] - Modal component for Pro upsells
 * @returns {JSX.Element}
 */
const Blocks = props => {
  const {
    isPremium,
    disabledBlocks,
    onChange,
    allBlocks,
    status,
    ProModal = null,
    pageTitle = 'All Blocks'
  } = props;
  const publishedBlocks = allBlocks.filter(b => 'published' === b.status || !b.status);
  const [isSaving, setIsSaving] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [disableBlockName, setDisableBlockName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(disabledBlocks || []);
  const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [toast, setToast] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Update disabled blocks when disabledBlocks prop changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabledBlocks) {
      setDisableBlockName(disabledBlocks);
    }
  }, [JSON.stringify(disabledBlocks)]);

  // Update toast based on status prop
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (status === 'loading') {
      setToast({
        message: 'Loading...',
        type: 'loading'
      });
      setIsSaving(true);
    } else if (status === 'success') {
      setToast({
        message: 'Saved successfully!',
        type: 'success'
      });
      setIsSaving(false);
      setTimeout(() => setToast(null), 3000);
    } else if (status === 'error') {
      setToast({
        message: 'Failed to save',
        type: 'error'
      });
      setIsSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  }, [status]);
  const handleCheckboxChange = (blockName, isChecked) => {
    const updatedBlocksName = isChecked ? disableBlockName.filter(name => name !== blockName) : [...disableBlockName, blockName];
    setDisableBlockName(updatedBlocksName);
    onChange?.(updatedBlocksName);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };
  const handleActivateAll = () => {
    setDisableBlockName([]);
    onChange?.([]);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };
  const handleDeactivateAll = () => {
    // Exclude required blocks from being deactivated
    const allBlockNames = publishedBlocks.flatMap(block => {
      if (block.children && Array.isArray(block.children)) {
        return block.children.filter(child => !child.required).map(child => child.name);
      } else {
        return block.required ? [] : block.name;
      }
    });
    setDisableBlockName(allBlockNames);
    onChange?.(allBlockNames);
    setToast({
      message: 'Saving changes...',
      type: 'loading'
    });
    setIsSaving(true);
  };

  // Separate grouped blocks from individual blocks
  const groupedBlocks = [];
  const individualBlocks = [];
  publishedBlocks.forEach(block => {
    if (block.children && Array.isArray(block.children)) {
      groupedBlocks.push(block);
    } else {
      individualBlocks.push(block);
    }
  });

  // Filter blocks based on search term
  const filterBlocksBySearch = blocksToFilter => {
    return blocksToFilter.filter(block => {
      if (block.children) {
        // For grouped blocks, check if title or any child matches
        const matchesTitle = block.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesChildren = block.children.some(child => child.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesTitle || matchesChildren;
      } else {
        // For individual blocks
        return block.title?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  };
  const filteredGroupedBlocks = filterBlocksBySearch(groupedBlocks);
  const filteredIndividualBlocks = filterBlocksBySearch(individualBlocks);
  const hasResults = filteredGroupedBlocks.length > 0 || filteredIndividualBlocks.length > 0;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardBlocks"
  }, !isPremium && ProModal && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProModal, null), toast && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Toast__WEBPACK_IMPORTED_MODULE_5__["default"], {
    message: toast.message,
    type: toast.type
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksTop"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, pageTitle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksSearch"
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "Search...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    className: "search-input"
  }), searchTerm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    onClick: () => setSearchTerm('')
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.closeIcon)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "bBlocksDashboardBtn actionBtn activeAllBtn",
    onClick: handleActivateAll
  }, "Activate All"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "bBlocksDashboardBtn actionBtn deActiveAllBtn",
    onClick: handleDeactivateAll
  }, "Deactivate All")), !hasResults ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "noBlocksFound"
  }, "No blocks found matching your search...") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "blocksContent"
  }, filteredGroupedBlocks.map(group => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: group.title,
    className: "blocksGroup"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "groupTitle"
  }, group.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashboardBlocks"
  }, group.children.filter(child => child.status === 'published' || !child.status).map(childBlock => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Block__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: childBlock.name,
    block: childBlock,
    isPremium: isPremium,
    disableBlockName: disableBlockName,
    handleCheckboxChange: handleCheckboxChange,
    isSaving: isSaving
  }))))), filteredIndividualBlocks.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashboardBlocks"
  }, filteredIndividualBlocks.map(block => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Block__WEBPACK_IMPORTED_MODULE_4__["default"], {
    key: block.name,
    block: block,
    isPremium: isPremium,
    disableBlockName: disableBlockName,
    handleCheckboxChange: handleCheckboxChange,
    isSaving: isSaving
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Blocks);

/***/ }),

/***/ "../bpl-tools/Admin/Changelog/index.js":
/*!*********************************************!*\
  !*** ../bpl-tools/Admin/Changelog/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Changelog/style.scss");




/**
 * Changelog Component
 * Renders the release notes/changelog section from a provided array.
 *
 * @param {object} props - Component props
 * @param {Array} props.changelogs - Array of changelog objects {type, version, list}
 * @returns {JSX.Element}
 */
const Changelog = props => {
  const {
    slug,
    changelogs,
    limit = 5,
    loadMoreLabel
  } = props;
  return changelogs?.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardChangelog bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Release Notes(Changelog)..."), changelogs?.slice(0, limit)?.map((changelog, index) => {
    const {
      type,
      version,
      list
    } = changelog;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `changelog ${type}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "list"
    }, list?.map((item, token) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: token
    }, item))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "time"
    }, version));
  }), loadMoreLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "mt20",
    target: "_blank",
    rel: "noopener noreferrer",
    href: `https://wordpress.org/plugins/${slug}/#developers`
  }, loadMoreLabel)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Changelog);

/***/ }),

/***/ "../bpl-tools/Admin/Demos/index.js":
/*!*****************************************!*\
  !*** ../bpl-tools/Admin/Demos/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   slideDown: () => (/* binding */ slideDown),
/* harmony export */   slideToggle: () => (/* binding */ slideToggle),
/* harmony export */   slideUp: () => (/* binding */ slideUp)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _Components_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Loading/Loading */ "../bpl-tools/Components/Loading/Loading.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Demos/style.scss");





function slideDown(el, duration = 300) {
  el.style.removeProperty('display');
  let display = window.getComputedStyle(el).display;
  if (display === 'none') display = 'block';
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = 'hidden';
  el.style.height = 0;
  el.offsetHeight;
  el.style.transition = `height ${duration}ms ease`;
  el.style.height = height + 'px';
  window.setTimeout(() => {
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition');
  }, duration);
}
function slideUp(el, duration = 300) {
  el.style.height = el.offsetHeight + 'px';
  el.style.overflow = 'hidden';
  el.offsetHeight;
  el.style.transition = `height ${duration}ms ease`;
  el.style.height = 0;
  window.setTimeout(() => {
    el.style.display = 'none';
    el.style.removeProperty('height');
    el.style.removeProperty('overflow');
    el.style.removeProperty('transition');
  }, duration);
}
function slideToggle(el, duration = 300) {
  if (window.getComputedStyle(el).display === 'none') {
    return slideDown(el, duration);
  }
  return slideUp(el, duration);
}
const searchIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"
}));
const angelDownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "angelDown",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
}));
const warningIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"
}));

/**
 * Demos Component
 * Renders a searchable and categorised list of product demos with an iframe/image preview.
 *
 * @param {object} props - Component props
 * @param {object} props.demoInfo - Demo configuration {allInOneLabel, allInOneLink, demos}
 * @returns {JSX.Element}
 */
const Demos = props => {
  const {
    isPremium,
    demoInfo
  } = props;
  const {
    allInOneLabel,
    allInOneLink,
    demos
  } = demoInfo;
  const [activeDemo, setActiveDemo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(demos[0]);
  const [activeIndex, setActiveIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [activeItem, setActiveItem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(demoInfo.demos[0].children?.[0] || demoInfo.demos[0]);
  const [expandedId, setExpandedId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(demoInfo.demos[0].title);
  const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const onAccordionChange = index => {
    setIsLoading(true);
    setActiveDemo(demos[index]);
    setActiveIndex(index);
    setExpandedId(demos[index].title);
    setActiveItem(demos[index]?.children?.[0]);
  };
  const onItemChange = item => {
    setIsLoading(true);
    if (item.url && item.url !== '#') {
      setActiveItem(item);
    }
  };

  // Filter the demos by search
  const filteredData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!searchQuery.trim()) return demoInfo.demos;
    const query = searchQuery.toLowerCase();
    return demoInfo.demos.filter(item => {
      const matchParent = item.title.toLowerCase().includes(query);
      const matchChildren = item.children?.some(child => child.title.toLowerCase().includes(query));
      if (matchChildren && !matchParent) setExpandedId(item.title);
      return matchParent || matchChildren;
    }).map(item => {
      if (item.children) {
        return {
          ...item,
          children: item.children.filter(child => child.title.toLowerCase().includes(query) || item.title.toLowerCase().includes(query))
        };
      }
      return item;
    });
  }, [searchQuery]);

  // Image Effect
  const imgWrapRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const imgRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const wrapEl = imgWrapRef.current;
    const imgEl = imgRef.current;
    const wrapperHeight = wrapEl?.clientHeight;
    const imgHeight = imgEl?.scrollHeight;
    function handleMouseOver() {
      imgEl.style.transform = `translateY(-${Number(imgHeight) - parseInt(wrapperHeight)}px)`;
    }
    function handleMouseOut() {
      imgEl.style.transform = `translateY(0px)`;
    }
    if (wrapEl && imgEl && Number(imgHeight) > parseInt(wrapperHeight)) {
      wrapEl.addEventListener('mouseover', handleMouseOver);
      wrapEl.addEventListener('mouseout', handleMouseOut);
    }
    return () => {
      if (wrapEl && imgEl) {
        wrapEl.removeEventListener('mouseover', handleMouseOver);
        wrapEl.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [activeDemo, activeIndex, isLoading]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardDemos bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebarHeader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Search"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search"
  }, searchIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "Search demo...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value)
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardButtons"
  }, !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#pricing"
  }, "Buy Now"), allInOneLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: allInOneLink,
    target: "_blank",
    variant: "secondary"
  }, allInOneLabel))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "sidebarList"
  }, filteredData.length > 0 ? filteredData.map((item, index) => {
    const {
      icon,
      title,
      url,
      children
    } = item;
    const hasChildren = children && children.length > 0;
    const isExpanded = expandedId === title;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: "demoItem"
    }, hasChildren ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `accordion ${isExpanded ? 'expanded' : ''}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      onClick: () => onAccordionChange(index),
      className: `parentDemo ${isExpanded ? 'active' : ''}`
    }, 'string' === typeof icon ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "icon",
      dangerouslySetInnerHTML: {
        __html: icon
      }
    }) : icon ? icon : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "text-sm font-semibold"
    }, title), angelDownIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: isExpanded ? 'expanded' : '',
      ref: el => {
        if (el) {
          if (isExpanded) {
            if ('block' !== el.style.display) {
              slideDown(el);
            }
          } else {
            slideUp(el);
          }
        }
      }
    }, children.map((child, cIdx) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: cIdx,
      className: activeItem.url === child.url ? 'active' : '',
      onClick: e => {
        e.preventDefault();
        e.stopPropagation();
        onItemChange(child);
      }
    }, child.title)))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `parentDemo ${activeItem.url === url ? 'active' : ''}`,
      onClick: e => {
        e.preventDefault();
        e.stopPropagation();
        onItemChange(item);
        setExpandedId(null);
      }
    }, 'string' === typeof icon ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "icon",
      dangerouslySetInnerHTML: {
        __html: icon
      }
    }) : icon ? icon : null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, title)));
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "notFound"
  }, warningIcon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-sm text-gray-500"
  }, "No matching results")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "main"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mainHeader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "headerInfo"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, expandedId ? `${activeDemo?.title || ''} - ` : '', activeItem?.title || '')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardButtons"
  }, !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#pricing"
  }, "Buy Now"), allInOneLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: allInOneLink,
    target: "_blank",
    variant: "secondary"
  }, allInOneLabel))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "canvas"
  }, isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Loading_Loading__WEBPACK_IMPORTED_MODULE_2__["default"], {
    text: "Demo Loading...",
    orientation: "vertical"
  }), activeItem.type === 'iframe' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    src: activeItem.url,
    title: `${activeItem.title} Demo`,
    onLoad: () => setIsLoading(false),
    sandbox: "allow-scripts allow-same-origin allow-popups allow-forms"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "canvasImg",
    ref: imgWrapRef
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: activeItem.url,
    alt: `${activeItem.title} Demo`,
    onLoad: () => setIsLoading(false),
    ref: imgRef
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Demos);

/***/ }),

/***/ "../bpl-tools/Admin/FeatureCompare/index.js":
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/FeatureCompare/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/FeatureCompare/style.scss");
/* harmony import */ var _lib_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/fs */ "../bpl-tools/Admin/lib/fs.js");
/* harmony import */ var _lib_fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");







/**
 * FeatureCompare Component
 * Renders a side-by-side comparison table of free vs pro features, fetching data from bPlugins API.
 *
 * @param {object} props - Component props
 * @param {Array} [props.plans=['free', 'pro']] - Plan names to compare
 * @param {object} props.freemius - Freemius configuration {product_id, public_key}
 * @returns {JSX.Element}
 */
const FeatureCompare = ({
  plans: dp = ['free', 'pro'],
  freemius
}) => {
  const {
    product_id,
    public_key
  } = freemius || {};
  const [product, setProduct] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [isProductLoading, setIsProductLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (product_id) {
      let mounted = true;
      const url = `https://api.bplugins.com/wp-json/bpl/v1/products/${product_id}`;
      setIsProductLoading(true);
      fetch(url).then(response => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
      }).then(data => {
        if (!mounted) return;
        setProduct(data);
      }).catch(err => {
        if (!mounted) return;
        // eslint-disable-next-line no-console
        console.error(err.message || 'Fetch error');
        setProduct({});
      }).finally(() => {
        if (mounted) setIsProductLoading(false);
      });
      return () => {
        mounted = false;
      };
    }
  }, [product_id]);
  const [cycles, setCycles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [cycle, setCycle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(cycles?.find(c => c.isDefault)?.name || cycles[0]?.name);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (product?.id) {
      const plans = product?.plans?.filter(p => dp.includes(p.name)) || [];
      const proPlan = plans?.find(p => p.name !== 'free') || plans?.[0] || {};
      const singlePrices = proPlan?.pricing?.[0];
      if (singlePrices && typeof singlePrices === 'object') {
        let c = [];
        // eslint-disable-next-line no-prototype-builtins
        if (singlePrices.hasOwnProperty('monthly')) {
          c.push({
            name: 'monthly',
            label: 'Billed Monthly'
          });
        }
        // eslint-disable-next-line no-prototype-builtins
        if (singlePrices.hasOwnProperty('annual')) {
          c.push({
            name: 'annual',
            label: 'Billed Yearly',
            isDefault: true
          });
        }
        // eslint-disable-next-line no-prototype-builtins
        if (singlePrices.hasOwnProperty('lifetime')) {
          c.push({
            name: 'lifetime',
            label: 'Lifetime'
          });
        }
        setCycles(c);
        setCycle(c?.find(cc => cc.isDefault)?.name || c[0]?.name);
      } else {
        setCycles([]);
        setCycle('');
      }
    }
  }, [product, isProductLoading]);
  if (isProductLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bPlDashboardBox",
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Loading..."));
  }
  const plans = product?.plans?.filter(p => dp.includes(p.name)) || [];

  // Extract features from the last plan as a reference
  const baseFeatures = plans?.[plans.length - 1]?.features || [];

  // Merge features from all plans, ensuring unique titles
  const features = baseFeatures.map(baseFeature => {
    const {
      title
    } = baseFeature;
    const featurePlans = plans.map(plan => {
      return plan.features.some(feature => feature.title === title) ? plan.id : null;
    }).filter(Boolean);
    return {
      ...baseFeature,
      plans: featurePlans
    };
  });

  // Add features from other plans that are not in the base features
  plans.forEach(plan => {
    plan.features.forEach(feature => {
      if (!features.some(f => f.title === feature.title)) {
        features.push({
          ...feature,
          plans: [plan.id]
        });
      }
    });
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardFeatureCompare bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "featureComparePricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cyclesSelector"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Billing Cycle"), cycles?.length > 1 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cycles"
  }, cycles.map(c => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: c.name,
      className: c.name === cycle ? 'active' : '',
      onClick: () => setCycle(c.name)
    }, c.label);
  })) : cycles[0]?.name === 'lifetime' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "pricingTitle"
  }, "Lifetime Access")), plans?.map(({
    id,
    name,
    title,
    pricing
  }) => {
    const price = Array.isArray(pricing) ? pricing?.find(p => parseInt(p?.licenses) === 1)?.[cycle] : '0.00';
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: id,
      className: `plan ${'free' === name ? 'free' : 'premium'}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "price"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, title), " $", price), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "note"
    }, 'free' === name ? 'Free forever' : `1 site license for ${'monthly' === cycle ? '1 month' : 'annual' === cycle ? '1 year' : cycle}`), 'free' === name ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
      href: "#pricing"
    }, "It's Free, See Pricing") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClick: e => {
        e.preventDefault();

        // eslint-disable-next-line no-undef
        new FS.Checkout({
          plugin_id: product_id,
          plan_id: id,
          public_key
        }).open({
          licenses: 1,
          billing_cycle: cycle
        });
      }
    }, "Get Started"));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Features"), plans.map(plan => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    key: plan.id
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, features?.map((feature, index) => {
    const {
      title,
      plans: featurePlans
    } = feature;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: index
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      dangerouslySetInnerHTML: {
        __html: title
      }
    }), plans.map(plan => {
      const {
        id
      } = plan;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
        key: id
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: `icon ${featurePlans?.includes(id) ? 'check' : 'cross'}`
      }, featurePlans?.includes(id) ? _utils_icons__WEBPACK_IMPORTED_MODULE_4__.checkIcon : _utils_icons__WEBPACK_IMPORTED_MODULE_4__.closeIcon));
    }));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureCompare);

/***/ }),

/***/ "../bpl-tools/Admin/Header/index.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/Header/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Header/style.scss");




/**
 * Renders the header for the plugin's dashboard page.
 *
 * @param {object} props - The component props.
 * @param {string} [props.name] - The name of the plugin.
 * @param {string} [props.media.logo] - The URL for the plugin's logo.
 * @param {string|number} [props.version] - The version number of the plugin.
 * @param {React.ReactNode} [props.children] - The navigation links or other elements to be rendered in the header.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = props => {
  const {
    name,
    media,
    version,
    isPremium,
    displayOurPlugins,
    children
  } = props;
  const {
    logo
  } = media || {};
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardHeader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginInfo",
    wrap: true
  }, logo && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: logo,
    alt: name || 'Plugin from bPlugins'
  }), name && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, name), version && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginVersion"
  }, "v", version)), children, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "navButtons"
  }, displayOurPlugins && (isPremium ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#our-plugins"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 640"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M224 32C241.7 32 256 46.3 256 64L256 160L384 160L384 64C384 46.3 398.3 32 416 32C433.7 32 448 46.3 448 64L448 160L512 160C529.7 160 544 174.3 544 192C544 209.7 529.7 224 512 224L512 288C512 383.1 442.8 462.1 352 477.3L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 477.3C197.2 462.1 128 383.1 128 288L128 224C110.3 224 96 209.7 96 192C96 174.3 110.3 160 128 160L192 160L192 64C192 46.3 206.3 32 224 32z"
  })), "Our Plugins") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "linkButton",
    href: "#our-plugins"
  }, "Our Plugins")), !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "upgrade",
    href: "#pricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 11 13",
    fill: "none"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M2.5 5.16931V3.16931C2.49936 2.5198 2.73579 1.89239 3.16492 1.40483C3.59404 0.917267 4.18636 0.603088 4.8307 0.521257C5.47503 0.439426 6.12708 0.595571 6.66446 0.960383C7.20184 1.3252 7.5876 1.87359 7.74933 2.50264M5.16667 8.50264C5.34348 8.50264 5.51305 8.43241 5.63807 8.30738C5.76309 8.18236 5.83333 8.01279 5.83333 7.83598C5.83333 7.65917 5.76309 7.4896 5.63807 7.36457C5.51305 7.23955 5.34348 7.16931 5.16667 7.16931C4.98986 7.16931 4.82029 7.23955 4.69526 7.36457C4.57024 7.4896 4.5 7.65917 4.5 7.83598C4.5 8.01279 4.57024 8.18236 4.69526 8.30738C4.82029 8.43241 4.98986 8.50264 5.16667 8.50264ZM5.16667 8.50264V10.5026M1.56667 5.16931H8.76667C9.35333 5.16931 9.83333 5.64931 9.83333 6.23598V10.9026C9.83333 11.7826 9.11333 12.5026 8.23333 12.5026H2.1C1.22 12.5026 0.5 11.7826 0.5 10.9026V6.23598C0.5 5.64931 0.98 5.16931 1.56667 5.16931Z",
    stroke: "currentColor",
    strokeLinecap: "round"
  })), "Upgrade Pro")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "../bpl-tools/Admin/OurPlugins/index.js":
/*!**********************************************!*\
  !*** ../bpl-tools/Admin/OurPlugins/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/OurPlugins/style.scss");







// Format download count with appropriate suffix
const formatDownloadCount = num => {
  if (num === undefined || num === null) return '0';
  const absNum = Math.abs(num);
  if (absNum >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (absNum >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (absNum >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

// Extract plugin name before dash or em-dash
const getPluginDisplayName = name => {
  if (!name) return '';
  // Replace HTML entities with their character equivalents
  let decodedName = name.replace(/&#8211;/g, '–') // en-dash entity
  .replace(/&#8212;/g, '—') // em-dash entity
  .replace(/&ndash;/g, '–') // en-dash named entity
  .replace(/&mdash;/g, '—') // em-dash named entity
  .replace(/&#45;/g, '-'); // hyphen entity

  return decodedName.split(/\s*[–\-—]\s*/)[0].trim();
};
const handleInstall = async (slug, path, status, setStatus) => {
  setStatus('installed' === status ? 'activating' : 'installing');
  try {
    // If plugin is already installed, just activate it
    if ('installed' === status && path) {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `/wp/v2/plugins/${path}`,
        method: 'POST',
        data: {
          status: 'active'
        }
      });
      setStatus('success');

      // eslint-disable-next-line no-console
      console.log(`Successfully activated: ${slug}`);
      setTimeout(() => {
        setStatus('activated');
      }, 1000);
      return;
    }

    // Install and activate new plugin
    const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/wp/v2/plugins',
      method: 'POST',
      data: {
        slug,
        status: 'active'
      }
    });
    setStatus('success');

    // eslint-disable-next-line no-console
    console.log(`Successfully installed: ${response.name}`);
    setTimeout(() => {
      setStatus('activated');
    }, 1000);
  } catch (error) {
    setStatus('error');

    // eslint-disable-next-line no-console
    console.error('Installation failed:', error.message);
    setTimeout(() => {
      setStatus('installed' === status ? 'installed' : 'notfound');
    }, 1000);
  }
};

/**
 * OurPlugins Component
 * Fetches and displays a list of other bPlugins products with install/activate functionality.
 *
 * @param {object} props - Component props
 * @param {string} props.slug - Current plugin slug (to exclude from list)
 * @param {Array} [props.slugs] - List of specific plugin slugs to display
 * @param {Array} props.installedPlugins - Provided by withSelect, list of locally installed plugins
 * @returns {JSX.Element}
 */
const OurPlugins = ({
  slug,
  slugs: allSlugs = ['3d-viewer', 'html5-video-player', 'html5-audio-player', 'pdf-poster', 'document-emberdder', 'advanced-post-block', 'advance-custom-html', 'b-carousel-block', 'b-blocks', 'html5-video-player', 'embed-lottie-player', 'b-slider'],
  installedPlugins
} = {}) => {
  const [plugins, setPlugins] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const slugs = allSlugs?.filter(s => s !== slug);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchPlugins = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[author]=bplugins&request[per_page]=100&request[fields]=title,name,slug,icons,short_description,version,active_installs,rating,ratings,downloaded`, {
          credentials: 'omit',
          mode: 'cors'
        });
        const data = await response.json();
        setPlugins(data?.plugins?.filter(p => slugs.includes(p.slug)) || []);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching plugins:', error);
        setPlugins([]);
        setIsLoading(false);
      }
    };
    if (slugs && slugs.length > 0) {
      fetchPlugins();
    }
  }, [JSON.stringify(slugs)]);
  if (isLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bPlDashboardBox",
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Loading..."));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardOurPlugins"
  }, plugins?.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginsList"
  }, plugins.sort((a, b) => b.active_installs - a.active_installs).map(plugin => {
    var _installedPlugins$fin;
    const {
      slug
    } = plugin;
    const installed = (_installedPlugins$fin = installedPlugins?.find(i => i?.plugin?.includes(slug))) !== null && _installedPlugins$fin !== void 0 ? _installedPlugins$fin : false;
    const activated = installed ? 'active' === installed?.status : false;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginCard, {
      key: slug,
      plugin: plugin,
      path: installed?.plugin,
      initStatus: activated ? 'activated' : installed ? 'installed' : 'notfound'
    });
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "No plugins found"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.withSelect)(select => {
  const {
    getPlugins
  } = select('core');
  return {
    installedPlugins: getPlugins?.({
      per_page: -1
    })
  };
})(OurPlugins));
const PluginCard = ({
  plugin,
  path,
  initStatus
}) => {
  const {
    name,
    slug,
    icons,
    short_description,
    downloaded
  } = plugin;
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initStatus);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pluginCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cardHeader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: icons?.['1x'] || icons?.['2x'],
    alt: name
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    dangerouslySetInnerHTML: {
      __html: getPluginDisplayName(name)
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description",
    dangerouslySetInnerHTML: {
      __html: short_description
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cardFooter"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "downloads"
  }, "Download: ", formatDownloadCount(downloaded)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rating"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 640 640"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "value"
  }, (plugin?.rating / 20).toFixed(1), " Rating"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    disabled: ['activated', 'success', 'installing'].includes(status),
    onClick: () => {
      if (!['activated', 'success', 'installing'].includes(status)) {
        handleInstall(slug, path, status, setStatus);
      }
    },
    className: status
  }, (() => {
    switch (status) {
      case 'activated':
      case 'success':
        return 'Activated';
      case 'installed':
        return 'Activate';
      case 'activating':
        return 'Activating...';
      case 'installing':
        return 'Installing...';
      case 'error':
        return 'Failed to Install';
      case 'notfound':
      default:
        return 'Install & Activate';
    }
  })()));
};

/***/ }),

/***/ "../bpl-tools/Admin/Overview/VideoPlayer.js":
/*!**************************************************!*\
  !*** ../bpl-tools/Admin/Overview/VideoPlayer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VideoPlayer_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoPlayer.scss */ "../bpl-tools/Admin/Overview/VideoPlayer.scss");



const VideoPlayer = ({
  src,
  width = '100%',
  height = 'auto',
  autoPlay = false,
  muted = false,
  loop = false,
  poster = null,
  isYoutube = false
}) => {
  const videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const previewVideoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const progressBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const volumeBarRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  // const previewCanvasRef = useRef(null)

  const [isPlaying, setIsPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [currentTime, setCurrentTime] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [duration, setDuration] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [volume, setVolume] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [isMuted, setIsMuted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(muted);
  const [isDragging, setIsDragging] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [showControls, setShowControls] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  // const [previewTime, setPreviewTime] = useState(0)
  // const [showPreview, setShowPreview] = useState(false)
  // const [previewPosition, setPreviewPosition] = useState(0)

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      // Setup preview video
      if (previewVideoRef.current) {
        previewVideoRef.current.src = src;
        previewVideoRef.current.muted = true;
      }
    };
    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
    };
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isDragging, src]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleKeyDown = e => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  const handleProgressClick = e => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const progress = (e.clientX - rect.left) / rect.width;
    const time = progress * duration;
    videoRef.current.currentTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(time);
  };
  const handleProgressMouseDown = e => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  // const handleProgressMouseMove = (e) => {
  //	if (!progressBarRef.current || !duration) return

  //	const rect = progressBarRef.current.getBoundingClientRect()
  //	const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  //	const time = progress * duration
  //	const position = (e.clientX - rect.left)

  //	setPreviewTime(time)
  //	setPreviewPosition(position)
  //	setShowPreview(true)

  //	// Update preview video time
  //	if (previewVideoRef.current && previewVideoRef.current.readyState >= 2) {
  //	previewVideoRef.current.currentTime = time
  //	}
  // }

  // const handleProgressMouseEnter = () => {
  //	setShowPreview(true)
  // }

  // const handleProgressMouseLeave = () => {
  //	setShowPreview(false)
  // }

  const handleVolumeClick = e => {
    const rect = volumeBarRef.current.getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume > 0) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };
  const handleVolumeMouseDown = e => {
    setIsDragging(true);
    handleVolumeClick(e);
  };
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const progressPercentage = duration ? currentTime / duration * 100 : 0;
  const volumePercentage = volume * 100;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleMouseMove = e => {
      if (isDragging) {
        if (e.target.closest('.progress-bar')) {
          handleProgressClick(e);
        } else if (e.target.closest('.volume-bar')) {
          handleVolumeClick(e);
        }
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  function getYouTubeEmbedSrc(youtubeUrl) {
    // Regular expressions to match different YouTube URL formats
    const regExpRegular = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\\&v=)([^#\\&\\?]*).*/;
    const regExpShort = /youtu.be\/([^#\\&\\?]+)/;
    let videoId = '';

    // Try to match regular YouTube URLs
    const match = youtubeUrl.match(regExpRegular);
    if (match && match[2].length === 11) {
      videoId = match[2];
    } else {
      // Try to match short YouTube URLs
      const shortMatch = youtubeUrl.match(regExpShort);
      if (shortMatch && shortMatch[1].length === 11) {
        videoId = shortMatch[1];
      } else {
        // If no match found, return null or throw an error
        return null;
      }
    }

    // Return the embed src URL
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: containerRef,
    className: "bPlVideoPlayer",
    style: {
      width,
      height
    },
    onMouseEnter: () => setShowControls(true),
    onMouseLeave: () => setShowControls(!isPlaying)
  }, isYoutube ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoPlayerYoutube"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    src: getYouTubeEmbedSrc(src),
    frameBorder: "0",
    allowFullScreen: true,
    style: {
      width,
      height
    },
    title: "YouTube Video"
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: videoRef,
    className: "video-element",
    src: src,
    poster: poster,
    autoPlay: autoPlay,
    muted: muted,
    loop: loop,
    onClick: togglePlay,
    preload: "metadata"
  }, "Your browser does not support the video tag."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    ref: previewVideoRef,
    className: "preview-video",
    muted: true,
    preload: "metadata",
    style: {
      display: 'none'
    }
  }), !isPlaying && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center-play-btn",
    onClick: togglePlay
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M8 5v14l11-7z"
  })))), isPlaying && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "center-play-btn pause",
    onClick: togglePlay
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "play-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "video-player-pause-icon",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 320 512"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
  })))), isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading-spinner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "spinner"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `video-controls ${showControls ? 'visible' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn play-pause-btn",
    onClick: togglePlay
  }, isPlaying ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M8 5v14l11-7z"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "time-display"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "current-time"
  }, formatTime(currentTime)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "separator"
  }, "/"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "duration"
  }, formatTime(duration))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: progressBarRef,
    className: "progress-bar",
    onClick: handleProgressClick,
    onMouseDown: handleProgressMouseDown
    // onMouseMove={handleProgressMouseMove}
    // onMouseEnter={handleProgressMouseEnter}
    // onMouseLeave={handleProgressMouseLeave}
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-filled",
    style: {
      width: `${progressPercentage}%`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "progress-handle",
    style: {
      left: `${progressPercentage}%`
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn volume-btn",
    onClick: toggleMute
  }, isMuted || volume === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-slider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: volumeBarRef,
    className: "volume-bar",
    onClick: handleVolumeClick,
    onMouseDown: handleVolumeMouseDown
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-filled",
    style: {
      width: `${volumePercentage}%`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "volume-handle",
    style: {
      left: `${volumePercentage}%`
    }
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "control-btn fullscreen-btn",
    onClick: toggleFullscreen
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoPlayer);

/***/ }),

/***/ "../bpl-tools/Admin/Overview/index.js":
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Overview/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Overview/style.scss");
/* harmony import */ var _VideoPlayer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VideoPlayer */ "../bpl-tools/Admin/Overview/VideoPlayer.js");








/**
 * Overview Component
 * Renders the welcome section of the plugin dashboard with banners and quick links.
 *
 * @param {object} props - Component props
 * @param {string} [props.name] - Plugin name
 * @param {string} props.slug - WordPress.org plugin slug
 * @param {object} [props.media] - Media configuration {thumbnail}
 * @param {object} [props.pages] - Link configuration {docs, landing}
 * @returns {JSX.Element}
 */
const Overview = props => {
  const {
    name,
    description,
    slug,
    media,
    isPremium,
    pages,
    startButton,
    site,
    children
  } = props;
  const {
    thumbnail,
    video,
    isYoutube
  } = media || {};
  const [showVideo, setShowVideo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const helpInfo = [{
    title: 'Looking for Documentation?',
    description: 'We have detailed documentation on every aspects of the plugin.',
    link: pages?.docs,
    linkText: 'Documentation'
  }, {
    title: 'Liked This Plugin?',
    description: 'Glad to know that, you can support us by leaving a feedback.',
    link: `https://wordpress.org/support/plugin/${slug}/reviews#new-post`,
    linkText: 'Rate the Plugin'
  }, {
    image: 'https://bplugins.com/wp-content/themes/b-technologies/assets/images/resource/support.png',
    title: 'Need any Assistance?',
    description: 'Our Expert Support Team is always ready to help you out promptly.',
    link: 'https://bplugins.com/support',
    linkText: 'Contact Support'
  }, {
    titleIcon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 292 512",
      fill: "#1877F2"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
      d: "m66 299.3v212.7h116v-212.7h86.5l18-97.8h-104.5v-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 0.4 37 1.2v-88.7c-14.3-3.9-49.3-7.9-69.5-7.9-106.9 0-156.2 50.5-156.2 159.4v42.1h-66v97.8z"
    })),
    title: 'Join Our Community',
    description: 'Get tutorials, plugin updates, feature announcements, and support from other WordPress users.',
    link: 'https://facebook.com/groups/1828495198556137',
    linkText: 'Join Now →'
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardOverview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "overviewLeft"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "overviewLeftTop bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, name && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Welcome to ", name), description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "buttons"
  }, !isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    href: "#pricing"
  }, "Buy Now"), startButton?.url && startButton?.label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    href: `${site?.url}/${startButton.url}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, startButton.label), pages?.landing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    href: pages.landing,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Learn More"))), thumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "overviewBanner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: thumbnail,
    alt: name
  }), video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "playButton",
    onClick: () => setShowVideo(true)
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.playIcon))), children), showVideo && video && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalContent"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "closeModal",
    onClick: () => setShowVideo(false)
  }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.closeIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_VideoPlayer__WEBPACK_IMPORTED_MODULE_5__["default"], {
    src: video,
    isYoutube: isYoutube,
    autoPlay: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlVideoModalOverlay",
    onClick: () => setShowVideo(false)
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "overviewRight"
  }, helpInfo?.map((item, index) => {
    const {
      image,
      titleIcon,
      title,
      description,
      link,
      linkText
    } = item;
    return link && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: "helpInfoItem bPlDashboardCard"
    }, image && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: image,
      alt: "Support Thumb"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, title, " ", titleIcon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      href: link,
      target: "_blank",
      rel: "noopener noreferrer"
    }, linkText));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.withSelect)(select => {
  const {
    getSite
  } = select('core');
  return {
    site: getSite?.()
  };
})(Overview));

/***/ }),

/***/ "../bpl-tools/Admin/Pricing/index.js":
/*!*******************************************!*\
  !*** ../bpl-tools/Admin/Pricing/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getFeatures: () => (/* binding */ getFeatures)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _lib_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/fs */ "../bpl-tools/Admin/lib/fs.js");
/* harmony import */ var _lib_fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/Pricing/style.scss");





const getFeatures = (plans, planId) => {
  const freeFeatures = plans.find(p => p.name === 'free')?.features?.map(f => f.title);
  const proFeatures = plans.find(p => p.name === 'pro')?.features?.filter(f => !freeFeatures.includes(f.title)).map(f => f.title);
  const features = {
    'free': freeFeatures,
    'pro': proFeatures
  };
  const planName = plans.find(p => parseInt(p.id) === parseInt(planId))?.name;
  const planFeatures = features[planName] || plans.find(p => parseInt(p.id) === parseInt(planId))?.features?.map(f => f.title);
  return planFeatures || [];
};
const Pricing = ({
  pricingInfo,
  options
}) => {
  const {
    pluginId,
    planId,
    licenses
  } = pricingInfo;

  // new state for fetched single product
  const [product, setProduct] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [isProductLoading, setIsProductLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (pluginId) {
      let mounted = true;
      const url = `https://api.bplugins.com/wp-json/bpl/v1/products/${pluginId}`;
      setIsProductLoading(true);
      fetch(url).then(response => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
      }).then(data => {
        if (!mounted) return;
        setProduct(data);
      }).catch(err => {
        if (!mounted) return;
        // eslint-disable-next-line no-console
        console.error(err.message || 'Fetch error');
        setProduct({});
      }).finally(() => {
        if (mounted) setIsProductLoading(false);
      });
      return () => {
        mounted = false;
      };
    }
  }, [pluginId]);
  const [cycles, setCycles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [cycle, setCycle] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(cycles?.find(c => c.isDefault)?.name || cycles[0]?.name);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (product?.id && planId) {
      const {
        plans
      } = product || {};
      const plan = plans?.find(p => parseInt(p.id) === parseInt(planId)) || plans?.[0] || {};
      const singlePrices = plan?.pricing?.[0];
      if (singlePrices && typeof singlePrices === 'object') {
        let c = [];
        // eslint-disable-next-line no-prototype-builtins
        if (singlePrices.hasOwnProperty('monthly')) {
          c.push({
            name: 'monthly',
            label: 'Billed Monthly'
          });
        }
        // eslint-disable-next-line no-prototype-builtins
        if (singlePrices.hasOwnProperty('annual')) {
          c.push({
            name: 'annual',
            label: 'Billed Yearly',
            isDefault: true
          });
        }
        // eslint-disable-next-line no-prototype-builtins
        if (singlePrices.hasOwnProperty('lifetime')) {
          c.push({
            name: 'lifetime',
            label: 'Lifetime'
          });
        }
        setCycles(c);
        setCycle(c?.find(cc => cc.isDefault)?.name || c[0]?.name);
      } else {
        setCycles([]);
        setCycle('');
      }
    }
  }, [product, isProductLoading, planId]);
  if (isProductLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "bPlDashboardPricing bPlDashboardBox"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Loading..."));
  }
  if (!product || !product?.id) {
    return null;
  }
  const {
    plans
  } = product || {};
  const plan = plans?.find(p => parseInt(p.id) === parseInt(planId)) || plans?.[0] || {};
  const {
    pricing = []
  } = plan || {};
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardPricing bPlDashboardCard"
  }, cycles?.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cycles"
  }, cycles.map(c => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: c.name,
      className: c.name === cycle ? 'active' : '',
      onClick: () => setCycle(c.name)
    }, c.label);
  })), cycles?.length === 1 && cycles[0]?.name === 'lifetime' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "pricingTitle"
  }, "One-time payment, lifetime access"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "plans"
  }, pricing?.length ? pricing?.map((price, index) => licenses.includes(price?.licenses) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Plan, {
    key: index,
    pricingInfo,
    product,
    price,
    cycle,
    options
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    style: {
      gridColumn: `1 / -1`,
      textAlign: 'center'
    }
  }, "Select a plan")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pricing);
const Plan = ({
  pricingInfo,
  product,
  price,
  cycle,
  options
}) => {
  const {
    logo,
    planId,
    button,
    featured
  } = pricingInfo;
  const {
    title,
    id,
    public_key,
    icon
  } = product || {};
  const {
    licenses
  } = price || {};
  const amount = price?.[cycle] + '';
  const name = !licenses ? 'Unlimited Sites' : licenses === 1 ? 'Single Site' : `${licenses} Sites`;
  const isFeatured = featured?.selected === (licenses || 'null');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `plan ${isFeatured ? 'bestValue' : ''}`,
    "data-best-text": featured?.text
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "planName wp-block-heading"
  }, name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "price"
  }, "$", amount), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "note"
  }, !licenses ? 'Unlimited site' : licenses === 1 ? '1 site' : `${licenses} sites`, " license for ", 'monthly' === cycle ? '1 month' : 'annual' === cycle ? '1 year' : cycle), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: `wp-block-list features checkList ${isFeatured ? 'whiteCheck' : 'themeCheck'}`
  }, getFeatures(product.plans, planId).map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i,
    dangerouslySetInnerHTML: {
      __html: f
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: `${isFeatured ? 'white' : ''}`,
    onClick: e => {
      e.preventDefault();

      // eslint-disable-next-line no-undef
      new FS.Checkout({
        plugin_id: id,
        plan_id: planId,
        public_key
      }).open({
        image: logo || icon,
        title,
        licenses,
        billing_cycle: cycle,
        ...options
      });
    }
  }, button.label));
};

/***/ }),

/***/ "../bpl-tools/Admin/ProAds/index.js":
/*!******************************************!*\
  !*** ../bpl-tools/Admin/ProAds/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Components/Button/Button */ "../bpl-tools/Components/Button/Button.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/icons */ "../bpl-tools/utils/icons.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Admin/ProAds/style.scss");





/**
 * ProAds Component
 * Renders a promotional banner for the Pro version, highlighting key features.
 *
 * @param {object} props - Component props
 * @param {string} props.name - Plugin name
 * @param {object} props.media - Media object containing proThumbnail
 * @param {Array} props.proFeatures - Array of strings describing pro features
 * @returns {JSX.Element}
 */
const ProAds = props => {
  const {
    name,
    media,
    proFeatures
  } = props;
  const {
    proThumbnail
  } = media;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardProAds bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: ""
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Go ", name, " Pro & Unlock More!"), proFeatures?.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, proFeatures?.map((f, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: i
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, _utils_icons__WEBPACK_IMPORTED_MODULE_2__.checkIcon), f))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Button_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    href: "#pricing"
  }, "View Pricing Plan")), proThumbnail && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: proThumbnail,
    alt: `${name} Pro features`
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProAds);

/***/ }),

/***/ "../bpl-tools/Admin/lib/fs.js":
/*!************************************!*\
  !*** ../bpl-tools/Admin/lib/fs.js ***!
  \************************************/
/***/ (() => {

/* eslint-disable no-undef */

var __FSCheckoutGlobalInternal__ = function (h) {
  "use strict";

  var G = Object.defineProperty,
    Q = Object.defineProperties;
  var z = Object.getOwnPropertyDescriptors;
  var S = Object.getOwnPropertySymbols;
  var P = Object.prototype.hasOwnProperty,
    O = Object.prototype.propertyIsEnumerable;
  var v = (h, a, d) => a in h ? G(h, a, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: d
    }) : h[a] = d,
    I = (h, a) => {
      for (var d in a || (a = {})) P.call(a, d) && v(h, d, a[d]);
      if (S) for (var d of S(a)) O.call(a, d) && v(h, d, a[d]);
      return h;
    },
    A = (h, a) => Q(h, z(a));
  var D = (h, a) => {
    var d = {};
    for (var u in h) P.call(h, u) && a.indexOf(u) < 0 && (d[u] = h[u]);
    if (h != null && S) for (var u of S(h)) a.indexOf(u) < 0 && O.call(h, u) && (d[u] = h[u]);
    return d;
  };
  var l = (h, a, d) => v(h, typeof a != "symbol" ? a + "" : a, d);
  const a = {
    Log(...i) {
      console && console.log && console.log(...i);
    },
    Error(...i) {
      console && console.error && console.error(...i);
    },
    Warn(...i) {
      console && console.warn && console.warn(...i);
    },
    Debug(...i) {
      console && console.debug && console.debug(...i);
    }
  };
  function d(i, t) {
    const e = i.contentWindow,
      s = i.src,
      o = {};
    if (!e || !s) return null;
    const n = function (r) {
      if (!(r && r.origin && r.origin.indexOf("js.stripe.com") > 0 || r.origin.indexOf("www.paypal.com") > 0) && r.origin === t && r && r.data && typeof r.data == "string" && r.data.charAt(0) === "{") try {
        const c = JSON.parse(r.data);
        typeof c == "object" && c.type && o[c.type] && o[c.type].forEach(m => {
          m(c.data);
        });
      } catch (c) {
        a.Error(c);
      }
    };
    return window.addEventListener("message", n), {
      on(r, c) {
        o[r] || (o[r] = []), o[r].push(c);
      },
      one(r, c, m = !1) {
        m && delete o[r], !o[r] && this.on(r, c);
      },
      destroy() {
        window.removeEventListener("message", n);
      },
      post(r, c) {
        e.postMessage(JSON.stringify({
          type: r,
          data: c
        }), s.replace(/([^:]+:\/\/[^/]+).*/, "$1"));
      }
    };
  }
  const u = 2147483647;
  function $() {
    const i = function () {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    };
    return i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i();
  }
  function N() {
    let i = !1;
    try {
      const t = navigator.userAgent.toLowerCase();
      /edge\/|trident\/|msie /.test(t) ? i = !0 : t.indexOf("safari") !== -1 && (t.indexOf("chrome") > -1 || (i = !0));
    } catch (t) {}
    return i;
  }
  function x(i) {
    return typeof i == "undefined" || typeof i == "function" || typeof i == "object" && i !== null;
  }
  function M(i) {
    return x(i) ? null : i === null ? "null" : i === !0 ? "1" : i === !1 ? "0" : encodeURIComponent(i).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/%20/g, "+");
  }
  function U(i) {
    const t = [];
    return Object.keys(i).forEach(e => {
      const s = i[e],
        o = M(s);
      o !== null && t.push(`${e}=${o}`);
    }), t.join("&");
  }
  function B(i) {
    return i.pageY <= 20;
  }
  function y() {
    return typeof window == "undefined";
  }
  function w(i, t) {
    if (i == null) throw new Error(t);
  }
  class T {
    constructor(t) {
      l(this, "styleElement");
      l(this, "bodyScrollDisableClassName");
      l(this, "isFlashingBrowser");
      l(this, "overflow", {
        x: 0,
        y: 0
      });
      l(this, "metaColorSchemeValue", null);
      l(this, "metaColorSchemeElement", null);
      this.guid = t, this.bodyScrollDisableClassName = `is-fs-checkout-open-${this.guid}`, this.styleElement = document.createElement("style"), this.styleElement.textContent += this.getBasicStyle(), this.isFlashingBrowser = N() || !y() && !!document.querySelector("#___gatsby"), this.metaColorSchemeElement = document.head.querySelector('meta[name="color-scheme"]');
    }
    addStyle(t) {
      this.styleElement.textContent += t;
    }
    attach() {
      return document.head.appendChild(this.styleElement), this;
    }
    remove() {
      return document.head.removeChild(this.styleElement), this;
    }
    disableBodyScroll() {
      this.backupScrollPosition(), document.body.classList.add(this.bodyScrollDisableClassName);
    }
    enableBodyScroll() {
      document.body.classList.remove(this.bodyScrollDisableClassName), this.restoreScrollPosition();
    }
    disableMetaColorScheme() {
      this.metaColorSchemeElement && (this.metaColorSchemeValue = this.metaColorSchemeElement.getAttribute("content"), this.metaColorSchemeElement.setAttribute("content", "light"));
    }
    enableMetaColorScheme() {
      this.metaColorSchemeElement && this.metaColorSchemeValue && (this.metaColorSchemeElement.setAttribute("content", this.metaColorSchemeValue), this.metaColorSchemeValue = null);
    }
    getBasicStyle() {
      return `body.${this.bodyScrollDisableClassName} { overflow: hidden !important; }`;
    }
    backupScrollPosition() {
      this.overflow = {
        x: document.documentElement.scrollTop,
        y: document.documentElement.scrollLeft
      };
    }
    restoreScrollPosition() {
      document.documentElement.scrollTop = this.overflow.x, document.documentElement.scrollLeft = this.overflow.y;
    }
  }
  class q {
    constructor(t, e, s = "Loading Freemius Checkout") {
      l(this, "loaderElement");
      l(this, "isOpen", !1);
      l(this, "loaderElementId");
      this.style = t, this.loaderElementId = `fs-loader-${this.style.guid}`, this.loaderElement = document.createElement("div"), this.loaderElement.id = this.loaderElementId, this.loaderElement.innerHTML = `<img src="${e}" alt="${s}" />`, this.style.addStyle(this.getStyle());
    }
    show() {
      return this.isOpen ? this : (this.loaderElement.classList.add("show"), document.body.appendChild(this.loaderElement), this.isOpen = !0, this);
    }
    hide() {
      return this.isOpen ? (this.loaderElement.classList.remove("show"), document.body.removeChild(this.loaderElement), this.isOpen = !1, this) : this;
    }
    getStyle() {
      return `#${this.loaderElementId} { display: none; position: fixed; z-index: ${u - 1}; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; text-align: left; background: rgba(0, 0, 0, 0.6); transition: opacity 200ms ease-out; will-change: opacity; opacity: 0; } #${this.loaderElementId}.show { opacity: 1; display: block; } #${this.loaderElementId} img { position: absolute; top: 40%; left: 50%; width: auto; height: auto; margin-left: -25px; background: #fff; padding: 10px; border-radius: 50%; box-shadow: 2px 2px 2px rgba(0,0,0,0.1); }`;
    }
  }
  class R {
    constructor(t, e, s, o, n) {
      l(this, "postman", null);
      l(this, "iFrame");
      l(this, "loadedEventListeners", new Set());
      l(this, "closedEventListeners", new Set());
      this.baseUrl = t, this.visibleClass = o, this.checkoutEvents = n, this.iFrame = this.attachIFrame(t, e, s), this.addEventListeners();
    }
    close() {
      var t;
      (t = this.postman) == null || t.post("close", null);
    }
    onClosed(t) {
      this.closedEventListeners.add(t);
    }
    onLoaded(t) {
      this.loadedEventListeners.add(t);
    }
    addToExitIntent(t) {
      t.addListener(() => {
        var e, s, o;
        (e = this.postman) == null || e.post("exit_intent", null), (o = (s = this.checkoutEvents).onExitIntent) == null || o.call(s);
      });
    }
    attachIFrame(t, e, s) {
      const o = `${t}/?${U(e)}#${encodeURIComponent(document.location.href)}`,
        n = document.createElement("iframe");
      return n.id = s, n.src = o, n.setAttribute("allowTransparency", "true"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("style", "background: rgba(0,0,0,0.003); border: 0 none transparent;"), n.setAttribute("frameborder", "0"), n.setAttribute("data-testid", n.id), document.body.appendChild(n), n;
    }
    addEventListeners() {
      var c, m, E, k, F;
      const {
        success: t,
        purchaseCompleted: e,
        cancel: s,
        track: o,
        afterOpen: n,
        afterClose: r
      } = this.checkoutEvents;
      this.postman = d(this.iFrame, this.baseUrl), (c = this.postman) == null || c.one("upgraded", p => {
        try {
          t == null || t(p);
        } catch (g) {
          a.Error(g);
        }
        this.dispatchOnClosed(), this.removeIFrameAndPostman(), r == null || r();
      }, !0), (m = this.postman) == null || m.one("purchaseCompleted", p => {
        try {
          e == null || e(p);
        } catch (g) {
          a.Error(g);
        }
      }, !0), (E = this.postman) == null || E.one("canceled", () => {
        try {
          s == null || s();
        } catch (p) {
          a.Error(p);
        }
        this.dispatchOnClosed(), this.removeIFrameAndPostman(), r == null || r();
      }, !0), (k = this.postman) == null || k.on("track", p => {
        try {
          o == null || o(p.event, p);
        } catch (g) {
          a.Error(g);
        }
      }), (F = this.postman) == null || F.one("loaded", () => {
        var p;
        this.dispatchOnLoaded(), (p = this.iFrame) == null || p.classList.add(this.visibleClass);
        try {
          n == null || n();
        } catch (g) {
          a.Error(g);
        }
      }, !0);
    }
    removeIFrameAndPostman() {
      var t;
      (t = this.postman) == null || t.destroy(), this.postman = null, this.iFrame.remove(), this.closedEventListeners.clear(), this.loadedEventListeners.clear();
    }
    dispatchOnLoaded() {
      this.loadedEventListeners.forEach(t => t());
    }
    dispatchOnClosed() {
      this.closedEventListeners.forEach(t => t());
    }
  }
  const b = class b {
    constructor(t, e, s) {
      l(this, "iFrameID");
      this.style = t, this.options = e, this.baseUrl = s, this.iFrameID = `fs-checkout-page-${this.style.guid}`;
    }
    create(t) {
      const e = I(I({}, this.options), t);
      return new R(this.baseUrl, this.getQueryParams(e), this.iFrameID, b.VISIBLE_CLASS, e);
    }
    addStyle() {
      this.style.addStyle(this.getStyle());
    }
    getQueryParams(t) {
      const e = {
        mode: "dialog",
        guid: this.style.guid,
        _fs_checkout: !0
      };
      Object.entries(t).forEach(([o, n]) => {
        x(n) || (e[o] = n);
      });
      const {
        sandbox: s
      } = t;
      return s && s.ctx && s.token && (e.s_ctx_ts = s.ctx, e.sandbox = s.token), e;
    }
    getStyle() {
      return `#${this.iFrameID} { z-index: ${u - 1}; background: rgba(0,0,0,0.003); border: 0 none transparent; visibility: ${this.style.isFlashingBrowser ? "hidden" : "visible"}; margin: 0; padding: 0; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; -webkit-tap-highlight-color: transparent; overflow: hidden; } #${this.iFrameID}.${b.VISIBLE_CLASS} { visibility: visible; }`;
    }
  };
  l(b, "VISIBLE_CLASS", "show");
  let _ = b;
  class V {
    constructor(t, e, s, o, n) {
      l(this, "checkoutIFrameBuilder");
      l(this, "checkoutIFrame", null);
      this.style = t, this.exitIntent = e, this.loader = s, this.checkoutIFrameBuilder = new _(this.style, n, o), this.checkoutIFrameBuilder.addStyle();
    }
    isOpen() {
      return this.checkoutIFrame !== null;
    }
    open(t) {
      return this.isOpen() ? this : (this.style.disableBodyScroll(), this.style.disableMetaColorScheme(), this.loader.show(), this.exitIntent.attach(), this.checkoutIFrame = this.checkoutIFrameBuilder.create(t), this.checkoutIFrame.onLoaded(this.onLoaded.bind(this)), this.checkoutIFrame.onClosed(this.onClosed.bind(this)), this.checkoutIFrame.addToExitIntent(this.exitIntent), this);
    }
    close() {
      var t;
      return (t = this.checkoutIFrame) == null || t.close(), this;
    }
    onLoaded() {
      this.loader.hide();
    }
    onClosed() {
      this.checkoutIFrame = null, this.loader.hide(), this.style.enableBodyScroll(), this.style.enableMetaColorScheme(), this.exitIntent.detach();
    }
  }
  class j {
    constructor(t) {
      l(this, "exitIntentId");
      l(this, "exitIntentDiv", null);
      l(this, "clearExitIntentListener", null);
      l(this, "listeners", []);
      this.style = t, this.exitIntentId = `fs-exit-intent-${this.style.guid}`, this.style.addStyle(this.getStyle());
    }
    isAttached() {
      return this.exitIntentDiv !== null;
    }
    addListener(...t) {
      this.listeners.push(...t);
    }
    attach(...t) {
      if (t && this.addListener(...t), this.isAttached()) return this;
      this.exitIntentDiv = document.createElement("div"), this.exitIntentDiv.id = this.exitIntentId, document.body.appendChild(this.exitIntentDiv);
      const e = document.documentElement;
      let s = null;
      const o = 300,
        n = c => {
          B(c) && (s = window.setTimeout(() => {
            try {
              this.fireListeners();
            } catch (m) {
              a.Error(m);
            }
          }, o));
        },
        r = () => {
          s && (clearTimeout(s), s = null);
        };
      return e.addEventListener("mouseleave", n), e.addEventListener("mouseenter", r), this.clearExitIntentListener = () => {
        s && (clearTimeout(s), s = null), e.removeEventListener("mouseleave", n), e.removeEventListener("mouseenter", r);
      }, this;
    }
    detach() {
      var t, e;
      return this.isAttached() ? ((t = this.exitIntentDiv) == null || t.remove(), this.exitIntentDiv = null, (e = this.clearExitIntentListener) == null || e.call(this), this) : this;
    }
    fireListeners() {
      this.listeners.forEach(t => {
        t();
      });
    }
    getStyle() {
      return `#${this.exitIntentId} { z-index: ${u}; border: 0; background: transparent; position: fixed; padding: 0; margin: 0; height: 10px; left: 0; right: 0; width: 100%; top: 0; }`;
    }
  }
  const f = class f {
    constructor(t) {
      l(this, "queryParams", null);
      this.url = t, this.queryParams = this.parseQueryStringForCart();
    }
    hasCart() {
      return this.queryParams !== null;
    }
    getPluginID() {
      return w(this.queryParams, f.NO_CART_FOUND_MESSAGE), this.queryParams.__fs_plugin_id;
    }
    getPluginPublicKey() {
      return w(this.queryParams, f.NO_CART_FOUND_MESSAGE), this.queryParams.__fs_plugin_public_key;
    }
    matchesPluginID(t) {
      const e = Number.parseInt(this.getPluginID(), 10),
        s = Number.parseInt(t.toString(), 10);
      return Number.isFinite(e) && Number.isFinite(s) && e === s;
    }
    getCheckoutOptions() {
      w(this.queryParams, f.NO_CART_FOUND_MESSAGE);
      const t = {
        plugin_id: "",
        public_key: ""
      };
      return Object.entries(this.queryParams).forEach(([e, s]) => {
        e === "__fs_plugin_id" ? t.plugin_id = s : e === "__fs_plugin_public_key" ? t.public_key = s : t[e] = s;
      }), t;
    }
    parseQueryStringForCart() {
      const t = "__fs_authorization",
        e = new URLSearchParams(this.url.search);
      if (!e.has(t)) return null;
      const s = {};
      return e.forEach((o, n) => {
        n.startsWith("__fs_") && (s[n] = o);
      }), s;
    }
  };
  l(f, "NO_CART_FOUND_MESSAGE", "No cart was found");
  let C = f;
  class L {
    constructor(t, e = !0, s = "https://checkout.freemius.com") {
      l(this, "options", {
        plugin_id: 0,
        public_key: ""
      });
      l(this, "guid");
      l(this, "style");
      l(this, "loader");
      l(this, "checkoutPopup");
      l(this, "exitIntent");
      l(this, "cart");
      var E;
      this.baseUrl = s;
      const m = t,
        {
          plugin_id: o,
          product_id: n,
          public_key: r
        } = m,
        c = D(m, ["plugin_id", "product_id", "public_key"]);
      if (!o && !n) throw new Error("Must provide a product_id to options.");
      if (!r) throw new Error("Must provide the public_key to options.");
      this.options = A(I({}, c), {
        public_key: r,
        plugin_id: n != null ? n : o
      }), this.guid = $(), !y() && (this.style = new T(this.guid), this.loader = new q(this.style, (E = t.loadingImageUrl) != null ? E : `${this.baseUrl}/assets/img/spinner.svg`, t.loadingImageAlt), this.exitIntent = new j(this.style), this.checkoutPopup = new V(this.style, this.exitIntent, this.loader, this.baseUrl, this.options), this.style.attach(), this.cart = new C(new URL(window.location.href)), e && this.recoverCart());
    }
    open(t) {
      var e, s;
      if (!y()) {
        if ((e = this.checkoutPopup) != null && e.isOpen()) {
          a.Warn("Checkout popup already open. Please close it first before opening it again.");
          return;
        }
        (s = this.checkoutPopup) == null || s.open(t);
      }
    }
    close() {
      var t;
      y() || (t = this.checkoutPopup) == null || t.close();
    }
    destroy() {
      var t;
      y() || (this.close(), (t = this.style) == null || t.remove());
    }
    getGuid() {
      return this.guid;
    }
    recoverCart() {
      var t, e;
      if ((t = this.cart) != null && t.hasCart() && (e = this.cart) != null && e.matchesPluginID(this.options.plugin_id)) {
        const s = this.cart.getCheckoutOptions();
        this.open(s);
      }
    }
  }
  return window.FS = window.FS || {}, window.FS.Checkout = L, window.FS.postman = d, window.FS.Logger = a, h.Checkout = L, Object.defineProperty(h, Symbol.toStringTag, {
    value: "Module"
  }), h;
}({});

/***/ }),

/***/ "../bpl-tools/Components/Button/Button.js":
/*!************************************************!*\
  !*** ../bpl-tools/Components/Button/Button.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Components/Button/style.scss");

/**
 * Button Component
 * Renders a button or anchor element based on the presence of an onClick handler.
 *
 * Props:
 * - label: string (button/anchor text)
 * - href: string (anchor href)
 * - target: string (anchor target)
 * - onClick: function (button click handler)
 * - className: string (additional CSS classes)
 * - variant: string (button style variant)
 * - size: string (button size)
 * - ...props: any other props
 */


const Button = ({
  type = 'button',
  href = '',
  target = '',
  onClick = null,
  className,
  variant = 'primary',
  size = '',
  children,
  disabled = false,
  ...props
}) => {
  const cls = `bPlButton ${variant ? `variant-${variant}` : ''} ${size ? `size-${size}` : ''} ${className ? className : ''} ${disabled ? 'bPlButton-disabled' : ''}`;
  return 'function' === typeof onClick || !href ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: type,
    className: cls,
    ...props,
    onClick: onClick
  }, children) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: href,
    target: target,
    className: cls,
    ...props
  }, children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "../bpl-tools/Components/Loading/Loading.js":
/*!**************************************************!*\
  !*** ../bpl-tools/Components/Loading/Loading.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "../bpl-tools/Components/Loading/style.scss");


const Loading = ({
  className = '',
  text = 'Loading...',
  orientation = 'horizontal',
  iconSize = '2rem',
  iconThickness = '4px',
  textSize = '18px'
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `bPlLoading ${className}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `loadingContent ${orientation}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loadingSpinner",
    style: {
      width: iconSize,
      height: iconSize,
      borderWidth: iconThickness
    }
  }), text && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "loadingText",
    style: {
      fontSize: textSize
    }
  }, text)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);

/***/ }),

/***/ "../bpl-tools/utils/data.js":
/*!**********************************!*\
  !*** ../bpl-tools/utils/data.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentColor: () => (/* binding */ contentColor),
/* harmony export */   deskBreakpoint: () => (/* binding */ deskBreakpoint),
/* harmony export */   gradient: () => (/* binding */ gradient),
/* harmony export */   mobileBreakpoint: () => (/* binding */ mobileBreakpoint),
/* harmony export */   primaryColor: () => (/* binding */ primaryColor),
/* harmony export */   primaryColor100: () => (/* binding */ primaryColor100),
/* harmony export */   primaryColor1000: () => (/* binding */ primaryColor1000),
/* harmony export */   primaryColor200: () => (/* binding */ primaryColor200),
/* harmony export */   primaryColor300: () => (/* binding */ primaryColor300),
/* harmony export */   primaryColor400: () => (/* binding */ primaryColor400),
/* harmony export */   primaryColor500: () => (/* binding */ primaryColor500),
/* harmony export */   primaryColor600: () => (/* binding */ primaryColor600),
/* harmony export */   primaryColor700: () => (/* binding */ primaryColor700),
/* harmony export */   primaryColor800: () => (/* binding */ primaryColor800),
/* harmony export */   primaryColor900: () => (/* binding */ primaryColor900),
/* harmony export */   secondaryColor: () => (/* binding */ secondaryColor),
/* harmony export */   tabBreakpoint: () => (/* binding */ tabBreakpoint),
/* harmony export */   titleColor: () => (/* binding */ titleColor)
/* harmony export */ });
const deskBreakpoint = '@media only screen and (min-width: 1025px)';
const tabBreakpoint = '@media only screen and (max-width: 1024px)';
const mobileBreakpoint = '@media only screen and (max-width: 640px)';
const primaryColor = '#146EF5';
const primaryColor100 = '#e7f0fe';
const primaryColor200 = '#b6d2fc';
const primaryColor300 = '#85b4fa';
const primaryColor400 = '#5495f8';
const primaryColor500 = '#2377f6';
const primaryColor600 = '#095edc';
const primaryColor700 = '#0749ab';
const primaryColor800 = '#05347a';
const primaryColor900 = '#031f49';
const primaryColor1000 = '#010a18';
const secondaryColor = '#FF7A00';
const titleColor = '#070127';
const contentColor = '#485781';
const gradient = 'linear-gradient(135deg, #0040E3, #18D4FD)';

/***/ }),

/***/ "../bpl-tools/utils/icons.js":
/*!***********************************!*\
  !*** ../bpl-tools/utils/icons.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bookIcon: () => (/* binding */ bookIcon),
/* harmony export */   checkIcon: () => (/* binding */ checkIcon),
/* harmony export */   circleCheckIcon: () => (/* binding */ circleCheckIcon),
/* harmony export */   closeIcon: () => (/* binding */ closeIcon),
/* harmony export */   copyIcon: () => (/* binding */ copyIcon),
/* harmony export */   crownIcon: () => (/* binding */ crownIcon),
/* harmony export */   demoIcon: () => (/* binding */ demoIcon),
/* harmony export */   desktopIcon: () => (/* binding */ desktopIcon),
/* harmony export */   docsIcon: () => (/* binding */ docsIcon),
/* harmony export */   externalIcon: () => (/* binding */ externalIcon),
/* harmony export */   gearIcon: () => (/* binding */ gearIcon),
/* harmony export */   gripIcon: () => (/* binding */ gripIcon),
/* harmony export */   headsetIcon: () => (/* binding */ headsetIcon),
/* harmony export */   linkIcon: () => (/* binding */ linkIcon),
/* harmony export */   listIcon: () => (/* binding */ listIcon),
/* harmony export */   minusIcon: () => (/* binding */ minusIcon),
/* harmony export */   mobileIcon: () => (/* binding */ mobileIcon),
/* harmony export */   nextIcon: () => (/* binding */ nextIcon),
/* harmony export */   playIcon: () => (/* binding */ playIcon),
/* harmony export */   pluginIcon: () => (/* binding */ pluginIcon),
/* harmony export */   plusIcon: () => (/* binding */ plusIcon),
/* harmony export */   prevIcon: () => (/* binding */ prevIcon),
/* harmony export */   questionIcon: () => (/* binding */ questionIcon),
/* harmony export */   rightArrowIcon: () => (/* binding */ rightArrowIcon),
/* harmony export */   scrollIcon: () => (/* binding */ scrollIcon),
/* harmony export */   searchIcon: () => (/* binding */ searchIcon),
/* harmony export */   starIcon: () => (/* binding */ starIcon),
/* harmony export */   tabletIcon: () => (/* binding */ tabletIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "../bpl-tools/utils/data.js");


const desktopIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 548.172 548.172"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M534.75 49.965c-8.945-8.945-19.694-13.422-32.261-13.422H45.681c-12.562 0-23.313 4.477-32.264 13.422C4.471 58.913 0 69.663 0 82.226v310.633c0 12.566 4.471 23.315 13.417 32.265 8.951 8.945 19.702 13.414 32.264 13.414h155.318c0 7.231-1.524 14.661-4.57 22.269-3.044 7.614-6.09 14.273-9.136 19.981-3.042 5.715-4.565 9.897-4.565 12.56 0 4.948 1.807 9.24 5.424 12.847 3.615 3.621 7.898 5.435 12.847 5.435h146.179c4.949 0 9.233-1.813 12.848-5.435 3.62-3.606 5.427-7.898 5.427-12.847 0-2.468-1.526-6.611-4.571-12.415-3.046-5.801-6.092-12.566-9.134-20.267-3.046-7.71-4.569-15.085-4.569-22.128h155.318c12.56 0 23.309-4.469 32.254-13.414 8.949-8.949 13.422-19.698 13.422-32.265V82.226c.003-12.563-4.474-23.313-13.423-32.261zm-23.123 269.803c0 2.475-.903 4.613-2.711 6.424-1.81 1.804-3.952 2.707-6.427 2.707H45.681c-2.473 0-4.615-.903-6.423-2.707-1.807-1.817-2.712-3.949-2.712-6.424V82.226c0-2.475.902-4.615 2.712-6.423 1.809-1.805 3.951-2.712 6.423-2.712h456.815c2.471 0 4.617.904 6.42 2.712 1.808 1.809 2.711 3.949 2.711 6.423v237.542z"
}));
const tabletIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M394.667 0H117.333C87.936 0 64 23.936 64 53.333v405.333C64 488.064 87.936 512 117.333 512h277.333C424.064 512 448 488.064 448 458.667V53.333C448 23.936 424.064 0 394.667 0zM256 480c-11.755 0-21.333-9.579-21.333-21.333s9.579-21.333 21.333-21.333 21.333 9.579 21.333 21.333S267.755 480 256 480zm149.333-64c0 5.888-4.779 10.667-10.667 10.667H117.333c-5.888 0-10.667-4.779-10.667-10.667V53.333c0-5.888 4.779-10.667 10.667-10.667h277.333c5.888 0 10.667 4.779 10.667 10.667V416z"
}));
const mobileIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 15,
  height: 15,
  viewBox: "0 0 503.604 503.604"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: _data__WEBPACK_IMPORTED_MODULE_1__.primaryColor,
  d: "M337.324 0H167.192c-28.924 0-53.5 23.584-53.5 52.5v398.664c0 28.916 24.056 52.44 52.98 52.44l170.412-.184c28.92 0 52.58-23.528 52.58-52.448l.248-398.5C389.908 23.452 366.364 0 337.324 0zM227.68 31.476h49.36c4.336 0 7.868 3.52 7.868 7.868 0 4.348-3.532 7.868-7.868 7.868h-49.36a7.865 7.865 0 01-7.868-7.868 7.865 7.865 0 017.868-7.868zm-29.66 2.504c2.916-2.912 8.224-2.952 11.136 0a7.973 7.973 0 012.324 5.588c0 2.048-.864 4.088-2.324 5.548-1.452 1.46-3.504 2.32-5.548 2.32-2.084 0-4.088-.86-5.588-2.32-1.452-1.456-2.28-3.5-2.28-5.548-.004-2.088.828-4.132 2.28-5.588zm52.752 454.028c-12.984 0-23.544-10.568-23.544-23.548 0-12.984 10.56-23.548 23.544-23.548s23.544 10.564 23.544 23.548c0 12.98-10.564 23.548-23.544 23.548zm114.716-63.1H141.232V74.756h224.256v350.152z"
}));
const scrollIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "https://www.w3.org/2000/svg",
  width: 14,
  height: 14,
  viewBox: "0 0 330 330"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M100.606 229.393c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.857-5.858 15.355 0 21.213l75 75A14.954 14.954 0 00165 330a14.95 14.95 0 0010.606-4.394l75-75c5.858-5.857 5.858-15.355 0-21.213-5.857-5.857-15.355-5.857-21.213 0L180 278.787V51.212l49.394 49.394A14.95 14.95 0 00240 105a14.95 14.95 0 0010.606-4.394c5.858-5.857 5.858-15.355 0-21.213l-75-75c-5.857-5.858-15.355-5.858-21.213 0l-75 75c-5.858 5.857-5.858 15.355 0 21.213 5.857 5.857 15.355 5.857 21.213 0L150 51.212v227.574l-49.394-49.393z"
}));
const gearIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 16,
  height: 16,
  viewBox: "0 0 430.848 430.848"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M286.244,249.537l10.992-45.639c0.035-0.143,0.071-0.285,0.109-0.428c2.909-10.867,11.469-19.426,22.339-22.338 l33.347-8.936c-5.472-6.525-13.678-10.682-22.839-10.682h-9.837c-2.511-7.895-5.7-15.59-9.515-22.957l6.96-6.959 c11.622-11.623,11.622-30.535,0-42.156L296.76,68.4c-5.631-5.629-13.117-8.73-21.079-8.73c-7.961,0-15.447,3.102-21.078,8.732 l-6.96,6.959c-7.369-3.814-15.064-7.004-22.956-9.516V56.01c0-16.436-13.372-29.807-29.808-29.807h-29.758 c-16.436,0-29.808,13.371-29.808,29.807v9.836c-7.893,2.512-15.588,5.701-22.957,9.516l-6.96-6.961 c-5.631-5.629-13.117-8.73-21.078-8.73c-7.961,0-15.447,3.102-21.079,8.732L42.2,89.443c-11.622,11.621-11.622,30.533,0,42.156 l6.959,6.959c-3.815,7.367-7.004,15.063-9.515,22.957h-9.837C13.372,161.516,0,174.887,0,191.324v29.758 c0,16.436,13.372,29.807,29.808,29.807h9.837c2.511,7.895,5.7,15.588,9.515,22.957l-6.96,6.959 c-11.623,11.623-11.623,30.533,0,42.158l21.041,21.039c5.632,5.631,13.118,8.732,21.079,8.732s15.447-3.102,21.077-8.732 l6.96-6.959c7.366,3.815,15.061,7.002,22.957,9.514v9.838c0,16.436,13.372,29.809,29.808,29.809h25.809 c-2.388-5.691-3.644-11.852-3.645-18.209c-0.002-12.572,4.892-24.391,13.781-33.279L286.244,249.537z M180,286.201 c-44.112,0-80-35.887-80-79.998c0-44.113,35.888-80.002,80-80.002s80,35.889,80,80.002C260,250.314,224.112,286.201,180,286.201z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M425.267,218.734l-0.319-0.32c-0.939-0.941-2.189-1.428-3.541-1.469c-1.326,0-2.598,0.525-3.536,1.465l-21.596,21.596 c-3.304,3.305-7.699,5.125-12.375,5.125c-4.676,0-9.072-1.82-12.379-5.129c-3.307-3.305-5.128-7.701-5.128-12.377 c0.001-4.676,1.821-9.072,5.126-12.377l21.596-21.596c0.939-0.939,1.465-2.213,1.464-3.539c-0.001-1.328-0.53-2.6-1.47-3.537 l-0.314-0.313c-3.605-3.605-8.399-5.592-13.499-5.592c-1.665,0-3.325,0.219-4.936,0.65l-44.348,11.885 c-6.568,1.76-11.741,6.932-13.498,13.496c-0.011,0.041-0.021,0.08-0.031,0.121l-11.817,49.063l-87.667,87.666 c-6.528,6.527-10.122,15.207-10.121,24.44c0.002,9.232,3.598,17.91,10.126,24.439l2.088,2.088 c6.528,6.529,15.209,10.125,24.443,10.125h0c9.231,0,17.909-3.594,24.437-10.121l87.667-87.666l49.061-11.816 c0.041-0.01,0.082-0.022,0.122-0.031c6.563-1.758,11.735-6.928,13.497-13.496l11.883-44.352 C431.959,230.598,430.066,223.535,425.267,218.734z M257.26,368.406c-1.888,1.889-4.399,2.93-7.071,2.93 c-2.671,0-5.183-1.041-7.072-2.932c-1.887-1.885-2.928-4.397-2.928-7.068c-0.001-2.672,1.041-5.185,2.931-7.072 c1.886-1.887,4.398-2.928,7.069-2.928c2.672,0,5.184,1.041,7.072,2.93c1.887,1.885,2.928,4.396,2.928,7.068 C260.189,364.006,259.148,366.518,257.26,368.406z M316.194,305.935L274.82,347.31c-1.416,1.416-3.3,2.197-5.303,2.197 c-2.003,0-3.887-0.781-5.303-2.197c-1.417-1.416-2.197-3.299-2.197-5.303s0.78-3.887,2.197-5.303l41.374-41.375 c1.417-1.418,3.3-2.197,5.303-2.197s3.887,0.779,5.303,2.197c1.417,1.416,2.197,3.299,2.197,5.303S317.611,304.519,316.194,305.935 z"
}));
const bookIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
}));
const headsetIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24s-24-10.7-24-24V256C0 114.6 114.6 0 256 0S512 114.6 512 256V400.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24H240c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H144c-35.3 0-64-28.7-64-64V272c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64H352c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"
}));
const starIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 576 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
}));
const rightArrowIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 30,
  height: 30,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
}));
const copyIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 18,
  height: 18,
  viewBox: "0 0 448 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"
}));
const closeIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
}));
const gripIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 320 512",
  width: 16,
  height: 16
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"
}));
const listIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  stroke: "currentColor",
  fill: "currentColor",
  strokeWidth: "0",
  viewBox: "0 0 512 512",
  height: "1em",
  width: "1em",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
}));
const minusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"
}));
const plusIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"
}));
const prevIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
}));
const nextIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 320 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
}));
const checkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  className: "check",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"
}));
const circleCheckIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z"
}));
const searchIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "18px",
  height: "18px"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 2a8 8 0 105.29 13.71l5 5a1 1 0 001.42-1.42l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
}));
const demoIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: 25,
  height: 25,
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4.66667 12.25H11.9C11.9928 12.25 12.0818 12.2131 12.1475 12.1475C12.2131 12.0818 12.25 11.9928 12.25 11.9V2.1C12.25 2.00717 12.2131 1.91815 12.1475 1.85251C12.0818 1.78687 11.9928 1.75 11.9 1.75H2.1C2.00717 1.75 1.91815 1.78687 1.85251 1.85251C1.78687 1.91815 1.75 2.00717 1.75 2.1V9.33333M5.83333 3.5H10.5M3.5 3.5H4.08333M2.04167 11.9583L7 7M7 7V9.33333M7 7H4.66667",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const docsIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: 25,
  height: 25,
  viewBox: "0 0 14 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M11.6667 6.99999V3.35357C11.6667 3.30753 11.6577 3.26193 11.6401 3.21939C11.6225 3.17684 11.5966 3.1382 11.564 3.10566L9.72771 1.26932C9.66213 1.20367 9.57317 1.16674 9.48037 1.16666H2.68337C2.59055 1.16666 2.50152 1.20353 2.43589 1.26917C2.37025 1.33481 2.33337 1.42383 2.33337 1.51666V12.4833C2.33337 12.5761 2.37025 12.6652 2.43589 12.7308C2.50152 12.7964 2.59055 12.8333 2.68337 12.8333H6.41671M4.66671 5.83332H9.33337M4.66671 3.49999H7.00004M4.66671 8.16666H6.41671",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M9.33337 3.14999V1.37315C9.33345 1.33237 9.3456 1.29251 9.36829 1.25862C9.39099 1.22473 9.42321 1.19832 9.4609 1.18272C9.49859 1.16712 9.54005 1.16303 9.58006 1.17097C9.62007 1.17891 9.65683 1.19852 9.68571 1.22732L11.606 3.14765C11.6351 3.17642 11.655 3.21321 11.6631 3.25331C11.6712 3.29341 11.6672 3.33502 11.6515 3.37283C11.6359 3.41063 11.6093 3.44291 11.5752 3.46556C11.5412 3.48821 11.5011 3.5002 11.4602 3.49999H9.68337C9.59055 3.49999 9.50152 3.46311 9.43589 3.39748C9.37025 3.33184 9.33337 3.24281 9.33337 3.14999V3.14999Z",
  fill: "#6A72A5",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10.4731 9.88165L11.0565 9.29832C11.1172 9.23754 11.1893 9.18932 11.2687 9.15643C11.3481 9.12353 11.4331 9.1066 11.5191 9.1066C11.605 9.1066 11.6901 9.12353 11.7694 9.15643C11.8488 9.18932 11.9209 9.23754 11.9816 9.29832C12.1042 9.42095 12.1731 9.58723 12.1731 9.76061C12.1731 9.93399 12.1042 10.1003 11.9816 10.2229L11.3983 10.8062M10.4731 9.88107L8.7284 11.6258C8.64116 11.7133 8.58397 11.8263 8.56506 11.9484L8.42273 12.8567L9.33098 12.7149C9.45309 12.696 9.56605 12.6388 9.65356 12.5516L11.3977 10.8062M10.4731 9.88107L11.3983 10.8062",
  stroke: "#6A72A5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const playIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z"
}));
const questionIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 240C302.3 240 288 254.3 288 272C288 285.3 277.3 296 264 296C250.7 296 240 285.3 240 272C240 227.8 275.8 192 320 192C364.2 192 400 227.8 400 272C400 319.2 364 339.2 344 346.5L344 350.3C344 363.6 333.3 374.3 320 374.3C306.7 374.3 296 363.6 296 350.3L296 342.2C296 321.7 310.8 307 326.1 302C332.5 299.9 339.3 296.5 344.3 291.7C348.6 287.5 352 281.7 352 272.1C352 254.4 337.7 240.1 320 240.1zM288 432C288 414.3 302.3 400 320 400C337.7 400 352 414.3 352 432C352 449.7 337.7 464 320 464C302.3 464 288 449.7 288 432z"
}));
const pluginIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M224 32C241.7 32 256 46.3 256 64L256 160L384 160L384 64C384 46.3 398.3 32 416 32C433.7 32 448 46.3 448 64L448 160L512 160C529.7 160 544 174.3 544 192C544 209.7 529.7 224 512 224L512 288C512 383.1 442.8 462.1 352 477.3L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 477.3C197.2 462.1 128 383.1 128 288L128 224C110.3 224 96 209.7 96 192C96 174.3 110.3 160 128 160L192 160L192 64C192 46.3 206.3 32 224 32z"
}));
const linkIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 640"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M451.5 160C434.9 160 418.8 164.5 404.7 172.7C388.9 156.7 370.5 143.3 350.2 133.2C378.4 109.2 414.3 96 451.5 96C537.9 96 608 166 608 252.5C608 294 591.5 333.8 562.2 363.1L491.1 434.2C461.8 463.5 422 480 380.5 480C294.1 480 224 410 224 323.5C224 322 224 320.5 224.1 319C224.6 301.3 239.3 287.4 257 287.9C274.7 288.4 288.6 303.1 288.1 320.8C288.1 321.7 288.1 322.6 288.1 323.4C288.1 374.5 329.5 415.9 380.6 415.9C405.1 415.9 428.6 406.2 446 388.8L517.1 317.7C534.4 300.4 544.2 276.8 544.2 252.3C544.2 201.2 502.8 159.8 451.7 159.8zM307.2 237.3C305.3 236.5 303.4 235.4 301.7 234.2C289.1 227.7 274.7 224 259.6 224C235.1 224 211.6 233.7 194.2 251.1L123.1 322.2C105.8 339.5 96 363.1 96 387.6C96 438.7 137.4 480.1 188.5 480.1C205 480.1 221.1 475.7 235.2 467.5C251 483.5 269.4 496.9 289.8 507C261.6 530.9 225.8 544.2 188.5 544.2C102.1 544.2 32 474.2 32 387.7C32 346.2 48.5 306.4 77.8 277.1L148.9 206C178.2 176.7 218 160.2 259.5 160.2C346.1 160.2 416 230.8 416 317.1C416 318.4 416 319.7 416 321C415.6 338.7 400.9 352.6 383.2 352.2C365.5 351.8 351.6 337.1 352 319.4C352 318.6 352 317.9 352 317.1C352 283.4 334 253.8 307.2 237.5z"
}));
const crownIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 544 432"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m297 71.2c9.2-7.3 15-18.6 15-31.2 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 12.6 5.9 23.9 15 31.2l-68.4 107.6c-10 15.7-31.3 19.6-46.2 8.4l-59.5-44.5c4.5-6.4 7.1-14.3 7.1-22.7 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 21.8 17.5 39.6 39.2 40l32.6 217.5c4.7 31.3 31.6 54.5 63.3 54.5h273.8c31.7 0 58.6-23.2 63.3-54.5l32.6-217.5c21.7-0.4 39.2-18.2 39.2-40 0-22.1-17.9-40-40-40-22.1 0-40 17.9-40 40 0 8.4 2.6 16.3 7.1 22.7l-59.4 44.6c-14.9 11.2-36.2 7.3-46.2-8.4z"
}));
const externalIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "m290.4 19.8c5-12 16.7-19.8 29.6-19.8h160c17.7 0 32 14.3 32 32v160c0 12.9-7.8 24.6-19.8 29.6-12 5-25.7 2.2-34.9-6.9l-57.3-57.4-153.4 153.3c-12.5 12.5-32.8 12.5-45.3 0-12.5-12.5-12.5-32.8 0-45.3l153.4-153.3-57.3-57.4c-9.2-9.2-11.9-22.9-6.9-34.9zm-290.4 156.2c0-44.2 35.8-80 80-80h80c17.7 0 32 14.3 32 32 0 17.7-14.3 32-32 32h-80c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16h256c8.8 0 16-7.2 16-16v-80c0-17.7 14.3-32 32-32 17.7 0 32 14.3 32 32v80c0 44.2-35.8 80-80 80h-256c-44.2 0-80-35.8-80-80z"
}));

/***/ }),

/***/ "./src/Components/Common/utils/icons.js":
/*!**********************************************!*\
  !*** ./src/Components/Common/utils/icons.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lightBoxIcon: () => (/* binding */ lightBoxIcon),
/* harmony export */   masonryVideoGridIcon: () => (/* binding */ masonryVideoGridIcon),
/* harmony export */   parallaxRowIcon: () => (/* binding */ parallaxRowIcon),
/* harmony export */   sliderAutoplayIcon: () => (/* binding */ sliderAutoplayIcon),
/* harmony export */   testimonialIcon: () => (/* binding */ testimonialIcon),
/* harmony export */   videoCarouselIcon: () => (/* binding */ videoCarouselIcon),
/* harmony export */   videoGalleryIcon: () => (/* binding */ videoGalleryIcon),
/* harmony export */   videoPlaylistIcon: () => (/* binding */ videoPlaylistIcon),
/* harmony export */   videoSliderIcon: () => (/* binding */ videoSliderIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const iconColor = "#136EF5";
const videoGalleryIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  className: "bPlBlockIcon",
  viewBox: "0 0 1000 1000",
  width: 24,
  height: 24
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M889.5,73.5H285.6c-63.9,0-100.5,36.6-100.5,100.5v25.1h50.3v-25.1c0-36.2,14.1-50.3,50.3-50.3h603.9c36.6,0,50.3,13.6,50.3,50.3v425.7c0,36.6-13.6,50.3-50.3,50.3h-25.1v50.3h25.1c64.8,0,100.5-35.7,100.5-100.5V174.1C990,109.2,954.3,73.5,889.5,73.5z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M713.6,248h-598C47.5,248,10,283.7,10,348.5v477.4c0,60.1,40.4,100.5,100.5,100.5h603.1c63.9,0,100.5-36.6,100.5-100.5V348.5C814.1,284.6,777.5,248,713.6,248z M763.8,782.1v43.9c0,36.2-14.1,50.3-50.3,50.3h-45.4h-37.3H110.5c-45.4,0-50.3-35.1-50.3-50.3v-133v-35.5V348.5c0-31.8,9-50.3,55.4-50.3h598c36.2,0,50.3,14.1,50.3,50.3v399.3V782.1z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M324.1,449v301.5l213.6-150.8L324.1,449z"
}));

// Lightbox Icon
const lightBoxIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="256.000000pt"
  // height="256.000000pt"
  ,
  viewBox: "0 0 256.000000 256.000000",
  preserveAspectRatio: "xMidYMid meet",
  style: {
    fill: iconColor
  },
  width: 24,
  height: 24,
  className: "lbvg-video-gallery"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,256.000000) scale(0.100000,-0.100000)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2205 2465 c-37 -36 -33 -76 11 -125 l36 -40 -36 -42 c-100 -117 28 -217 133 -104 l25 26 38 -37 c99 -96 207 12 114 115 l-34 37 34 38 c45 48 48 105 8 136 -42 33 -80 26 -136 -27 l-27 -25 -41 36 c-49 45 -89 49 -125 12z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M26 1869 l-26 -20 0 -869 0 -869 26 -20 c27 -21 28 -21 1254 -21 1226 0 1227 0 1254 21 l26 20 0 869 0 869 -26 20 c-27 21 -28 21 -1254 21 -1226 0 -1227 0 -1254 -21z m2374 -791 l0 -653 -383 383 c-374 374 -383 382 -422 382 -38 0 -47 -8 -310 -270 l-270 -269 -122 119 c-173 171 -132 184 -465 -147 l-268 -267 0 687 0 687 1120 0 1120 0 0 -652z m-502 -846 l-463 -2 -152 152 -153 153 232 232 233 233 382 -382 383 -383 -462 -3z m-933 228 l230 -230 -460 0 -460 0 230 230 c126 127 230 230 230 230 0 0 104 -103 230 -230z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M671 1580 c-90 -19 -175 -93 -208 -183 -17 -46 -16 -146 3 -199 20 -61 75 -123 134 -153 141 -71 307 -21 384 115 28 50 31 63 31 140 0 69 -5 93 -23 127 -62 118 -191 179 -321 153z m150 -196 c51 -49 50 -122 -2 -174 -104 -103 -266 31 -188 156 11 19 21 34 22 34 1 0 20 6 41 14 48 17 88 7 127 -30z"
})));

// Masonry Video Grid Icon
const masonryVideoGridIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="512.000000pt"
  // height="512.000000pt"
  ,
  viewBox: "0 0 512.000000 512.000000",
  preserveAspectRatio: "xMidYMid meet",
  className: "mvg-icon",
  style: {
    fill: iconColor
  },
  width: 24,
  height: 24
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M615 4591 c-48 -22 -69 -44 -90 -94 -13 -32 -15 -163 -15 -1079 0 -654 4 -1056 10 -1078 11 -41 61 -94 103 -109 18 -7 180 -11 461 -11 433 0 433 0 476 23 30 16 51 37 67 67 l23 44 -2 1071 -3 1072 -29 37 c-57 76 -57 76 -536 76 -391 0 -428 -2 -465 -19z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2095 4591 c-48 -22 -69 -44 -90 -94 -13 -31 -15 -112 -15 -574 0 -501 2 -541 19 -578 22 -49 48 -73 98 -91 55 -19 851 -19 906 0 50 18 76 42 98 91 17 37 19 77 19 578 0 462 -2 543 -15 574 -21 50 -42 72 -90 94 -37 17 -74 19 -465 19 -391 0 -428 -2 -465 -19z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3575 4591 c-46 -21 -79 -54 -94 -94 -8 -19 -11 -361 -11 -1086 l0 -1058 23 -43 c16 -30 37 -51 67 -67 43 -23 43 -23 476 -23 281 0 443 4 461 11 42 15 92 68 103 109 6 22 10 424 10 1078 0 916 -2 1047 -15 1079 -21 50 -42 72 -90 94 -37 17 -74 19 -465 19 -392 0 -428 -2 -465 -19z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2095 2886 c-37 -17 -80 -62 -94 -99 -8 -19 -11 -361 -11 -1080 0 -999 1 -1054 19 -1092 22 -48 44 -69 94 -90 54 -23 860 -23 914 0 50 21 72 42 94 90 18 38 19 93 19 1093 0 872 -2 1058 -14 1085 -16 39 -61 82 -99 96 -45 17 -883 14 -922 -3z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M627 1866 c-50 -18 -76 -42 -98 -91 -17 -37 -19 -77 -19 -580 0 -503 2 -543 19 -580 22 -48 44 -69 94 -90 31 -13 101 -15 459 -15 476 0 477 1 534 76 l29 37 0 572 0 572 -29 37 c-57 75 -58 76 -531 75 -328 0 -428 -3 -458 -13z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3574 1861 c-23 -10 -54 -36 -70 -57 l-29 -37 -3 -546 c-2 -300 0 -560 3 -578 8 -43 50 -92 100 -114 37 -17 74 -19 465 -19 391 0 428 2 465 19 48 22 69 44 90 94 13 31 15 112 15 574 0 501 -2 541 -19 578 -10 22 -28 48 -39 58 -49 44 -76 46 -517 46 -389 1 -423 -1 -461 -18z"
})));

// Parallax Row Icon
const parallaxRowIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  id: "Layer_1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  x: "0px",
  y: "0px",
  viewBox: "0 0 512 512",
  style: {
    fill: iconColor,
    enableBackground: "new 0 0 512 512"
  },
  width: 24,
  height: 24,
  className: "pr_video-gallery",
  xmlSpace: "preserve"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M0,149.854v212.293h512V149.854H0z M158.179,324.683H37.463V187.317h120.716V324.683z M316.357,324.683H195.643V187.317 h120.715V324.683z M474.537,324.683H353.821V187.317h120.716V324.683z"
}))));

// Slider Autoplay Video Icon
const sliderAutoplayIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    fill: iconColor
  },
  width: 24,
  height: 24,
  className: "sav-gallery"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  id: "SVGRepo_bgCarrier",
  strokeWidth: "0"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  id: "SVGRepo_tracerCarrier",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  id: "SVGRepo_iconCarrier"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fillRule: "evenodd",
  d: "M5.23331,0.493645 C6.8801,-0.113331 8.6808,-0.161915 10.3579,0.355379 C11.4019,0.6773972 12.361984,1.20757325 13.1838415,1.90671757 L13.4526,2.14597 L14.2929,1.30564 C14.8955087,0.703065739 15.9071843,1.0850774 15.994017,1.89911843 L16,2.01275 L16,6.00002 L12.0127,6.00002 C11.1605348,6.00002 10.7153321,5.01450817 11.2294893,4.37749065 L11.3056,4.29291 L12.0372,3.56137 C11.389,2.97184 10.6156,2.52782 9.76845,2.26653 C8.5106,1.87856 7.16008,1.915 5.92498,2.37023 C4.68989,2.82547 3.63877,3.67423 2.93361,4.78573 C2.22844,5.89723 1.90836,7.20978 2.02268,8.52112 C2.13701,9.83246 2.6794,11.0698 3.56627,12.0425 C4.45315,13.0152 5.63528,13.6693 6.93052,13.9039 C8.22576,14.1385 9.56221,13.9407 10.7339,13.3409 C11.9057,12.7412 12.8476,11.7727 13.4147,10.5848 C13.6526,10.0864 14.2495,9.8752 14.748,10.1131 C15.2464,10.351 15.4575,10.948 15.2196,11.4464 C14.4635,13.0302 13.2076,14.3215 11.6453,15.1213 C10.0829,15.921 8.30101,16.1847 6.57402,15.8719 C4.84704,15.559 3.27086,14.687 2.08836,13.39 C0.905861,12.0931 0.182675,10.4433 0.0302394,8.69483 C-0.122195,6.94637 0.304581,5.1963 1.2448,3.7143 C2.18503,2.2323 3.58652,1.10062 5.23331,0.493645 Z M6,5.46077 C6,5.09472714 6.37499031,4.86235811 6.69509872,5.0000726 L6.7678,5.03853 L10.7714,7.57776 C11.0528545,7.75626909 11.0784413,8.14585256 10.8481603,8.36273881 L10.7714,8.42224 L6.7678,10.9615 C6.45867857,11.1575214 6.06160816,10.965274 6.00646097,10.6211914 L6,10.5392 L6,5.46077 Z"
})));

// Video Carousel Icon
const videoCarouselIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="512.000000pt"
  // height="512.000000pt"
  ,
  width: 24,
  height: 24,
  viewBox: "0 0 512.000000 512.000000",
  preserveAspectRatio: "xMidYMid meet"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)",
  className: "vcg-video-carousel-icon",
  fill: iconColor,
  stroke: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1422 4944 c-29 -7 -73 -26 -97 -40 -65 -38 -149 -134 -177 -201 l-23 -58 -3 -2055 c-2 -1443 1 -2071 9 -2107 21 -103 101 -213 196 -269 96 -56 64 -55 1259 -52 l1099 3 58 23 c67 27 163 112 201 177 59 100 56 -26 56 2195 0 2216 3 2095 -55 2193 -31 54 -99 122 -150 152 -95 56 -67 55 -1240 54 -904 0 -1089 -3 -1133 -15z m2290 -177 c26 -15 59 -42 72 -60 60 -78 56 65 56 -2146 0 -2276 7 -2085 -75 -2166 -79 -80 -5 -76 -1221 -73 l-1080 3 -49 26 c-57 29 -110 92 -125 148 -7 26 -9 695 -8 2082 l3 2044 28 47 c31 53 79 94 134 114 31 11 235 13 1128 11 l1090 -2 47 -28z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1945 3285 l-25 -24 0 -701 0 -701 26 -24 c15 -14 38 -25 51 -25 30 0 1321 674 1346 702 9 11 17 33 17 48 0 15 -8 37 -17 48 -26 30 -1316 702 -1348 702 -14 0 -37 -11 -50 -25z m773 -520 c210 -110 382 -202 382 -205 0 -4 -245 -134 -892 -472 l-128 -67 0 539 0 539 128 -67 c70 -37 300 -157 510 -267z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M586 4384 c-34 -11 -64 -31 -102 -68 -91 -92 -84 59 -84 -1756 0 -1815 -7 -1664 84 -1756 71 -71 118 -84 293 -84 129 0 135 1 158 25 33 32 33 78 0 110 -23 24 -29 25 -157 25 -144 0 -176 10 -204 62 -19 34 -19 3202 0 3236 28 52 60 62 204 62 128 0 134 1 157 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -23 24 -28 25 -162 24 -92 0 -154 -5 -187 -15z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4185 4375 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 23 -24 29 -25 155 -25 98 0 138 -4 160 -15 64 -33 60 83 60 -1665 0 -1748 4 -1632 -60 -1665 -22 -11 -62 -15 -160 -15 -126 0 -132 -1 -155 -25 -33 -32 -33 -78 0 -110 23 -24 29 -25 158 -25 175 0 222 13 293 84 91 92 84 -59 84 1756 0 1815 7 1664 -84 1756 -71 71 -118 84 -293 84 -129 0 -135 -1 -158 -25z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M100 3901 c-19 -10 -48 -35 -65 -55 l-30 -38 -3 -1234 c-2 -1197 -2 -1235 17 -1272 23 -46 46 -67 94 -87 51 -21 81 -19 113 8 37 33 37 81 0 114 -15 12 -36 23 -47 23 -19 0 -19 18 -19 1200 0 1182 0 1200 19 1200 35 0 74 43 74 80 0 69 -80 101 -153 61z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4894 3897 c-20 -17 -27 -33 -27 -57 0 -37 39 -80 74 -80 19 0 19 -18 19 -1200 0 -1182 0 -1200 -19 -1200 -35 0 -74 -43 -74 -80 0 -40 40 -80 81 -80 34 0 102 31 124 56 50 56 48 6 48 1304 0 1067 -2 1215 -15 1247 -20 48 -41 71 -87 94 -50 26 -91 24 -124 -4z"
})));

// Video Playlist Icon
const videoPlaylistIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  // width="800px"
  // height="800px"
  width: 24,
  height: 24,
  viewBox: "0 0 24 24"
  // fill="none"
  ,
  xmlns: "http://www.w3.org/2000/svg",
  className: "video-playlist-gallery-icon",
  style: {
    fill: iconColor,
    stroke: iconColor
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  clipPath: "url(#clip0_429_11182)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M6 6L3 7.73205L3 4.26795L6 6Z",
  strokeOpacity: 1,
  strokeWidth: 2.5,
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 12L21 12",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 6L21 6",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M3 18L21 18",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("clipPath", {
  id: "clip0_429_11182"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", {
  width: 24,
  height: 24,
  fill: "white"
}))));

// Video Slider Icon
const videoSliderIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  id: "Layer_1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
  // width="800px"
  // height="800px"
  ,
  width: 24,
  height: 24,
  viewBox: "0 0 46 32",
  enableBackground: "new 0 0 46 32",
  xmlSpace: "preserve",
  className: "vs-gallery",
  style: {
    fill: iconColor,
    stroke: iconColor
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M20.502,19.929c0.26,0,0.519-0.07,0.748-0.203l4.203-2.427c0.47-0.271,0.75-0.756,0.75-1.299 s-0.28-1.028-0.75-1.299l-4.203-2.427c-0.229-0.133-0.488-0.203-0.748-0.203c-0.828,0-1.502,0.674-1.502,1.502v4.854 C19,19.255,19.674,19.929,20.502,19.929z M20,13.573c0-0.31,0.261-0.502,0.502-0.502c0.086,0,0.17,0.023,0.248,0.068l4.203,2.427 c0.226,0.131,0.25,0.347,0.25,0.434s-0.024,0.303-0.25,0.434L20.75,18.86C20.453,19.033,20,18.847,20,18.427V13.573z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M7,1.5v29C7,31.327,7.673,32,8.5,32h29c0.827,0,1.5-0.673,1.5-1.5v-29C39,0.673,38.327,0,37.5,0h-29 C7.673,0,7,0.673,7,1.5z M38,1.5v29c0,0.275-0.225,0.5-0.5,0.5h-29C8.225,31,8,30.775,8,30.5v-29C8,1.225,8.225,1,8.5,1h29 C37.775,1,38,1.225,38,1.5z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M5.374,26.168c-0.184-0.208-0.501-0.225-0.706-0.042l-2.836,2.521c-0.225,0.201-0.467,0.114-0.537,0.083 C1.226,28.698,1,28.573,1,28.273V3.727c0-0.3,0.226-0.425,0.295-0.456c0.07-0.031,0.312-0.118,0.537,0.083l2.836,2.521 C4.873,6.056,5.19,6.038,5.374,5.832S5.538,5.31,5.332,5.126L2.496,2.605c-0.447-0.398-1.065-0.49-1.61-0.247 C0.34,2.604,0,3.128,0,3.727v24.547c0,0.599,0.34,1.123,0.886,1.368c0.201,0.09,0.411,0.135,0.62,0.135 c0.357,0,0.708-0.131,0.99-0.382l2.836-2.521C5.538,26.69,5.558,26.374,5.374,26.168z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: "#808184",
  d: "M45.114,2.358c-0.546-0.244-1.163-0.151-1.61,0.247l-2.836,2.521c-0.206,0.184-0.226,0.5-0.042,0.706 s0.501,0.224,0.706,0.042l2.836-2.521c0.225-0.201,0.468-0.114,0.537-0.083S45,3.427,45,3.727v24.547 c0,0.3-0.226,0.425-0.295,0.456s-0.312,0.118-0.537-0.083l-2.836-2.521c-0.205-0.183-0.522-0.166-0.706,0.042 c-0.184,0.206-0.164,0.522,0.042,0.706l2.836,2.521c0.282,0.251,0.633,0.382,0.99,0.382c0.209,0,0.419-0.045,0.62-0.135 C45.66,29.396,46,28.872,46,28.273V3.727C46,3.128,45.66,2.604,45.114,2.358z"
})));

// Video Testimonial Icon
const testimonialIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.0"
  // width="512.000000pt"
  // height="512.000000pt"
  ,
  width: 24,
  height: 24,
  viewBox: "0 0 512.000000 512.000000",
  preserveAspectRatio: "xMidYMid meet",
  className: "video-testimonial-section",
  style: {
    fill: iconColor,
    stroke: iconColor
  }
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
  transform: "translate(0.000000,512.000000) scale(0.100000,-0.100000)"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1168 4465 c-57 -21 -121 -69 -151 -112 -58 -84 -58 -76 -55 -713 3 -567 4 -586 23 -612 25 -35 91 -68 135 -68 44 0 110 33 135 68 19 26 20 45 23 580 l2 552 1440 0 1440 0 0 -960 0 -960 -266 0 c-174 0 -273 -4 -287 -11 -12 -6 -109 -97 -214 -202 l-193 -192 0 151 c0 140 -2 153 -23 184 -12 19 -38 43 -57 54 -33 20 -51 21 -280 21 -229 0 -247 -1 -280 -21 -55 -32 -80 -77 -80 -144 0 -67 26 -113 80 -141 29 -16 58 -19 177 -19 l143 0 0 -269 c0 -262 1 -269 23 -301 41 -61 130 -87 204 -60 15 6 168 150 338 320 l310 309 250 3 c238 3 252 4 297 26 63 31 126 96 157 162 l26 55 0 1035 0 1035 -33 67 c-33 68 -80 116 -152 154 -34 18 -90 19 -1565 21 -1279 1 -1536 -1 -1567 -12z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M2361 3840 c-48 -11 -83 -40 -108 -90 -23 -44 -23 -45 -23 -550 0 -505 0 -506 23 -550 31 -63 76 -90 146 -90 55 0 60 3 486 258 478 287 475 284 475 382 0 97 -3 99 -405 342 -533 321 -519 314 -594 298z m509 -640 c0 -3 -70 -46 -155 -97 l-155 -92 0 189 0 189 155 -92 c85 -51 155 -94 155 -97z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M1345 2702 c-224 -67 -392 -239 -449 -459 -21 -79 -21 -240 -1 -318 21 -78 63 -169 107 -226 l35 -46 -45 -28 c-110 -70 -223 -200 -282 -326 -55 -117 -70 -203 -70 -388 0 -148 2 -170 20 -199 59 -97 220 -98 279 -2 14 24 19 59 24 178 8 214 44 311 155 414 110 103 198 132 402 132 204 0 292 -29 402 -132 111 -103 147 -200 155 -414 7 -164 16 -192 75 -228 45 -27 131 -27 176 0 64 39 72 65 72 251 0 185 -15 271 -70 388 -59 124 -170 254 -282 327 l-44 29 34 45 c81 104 122 235 122 383 0 120 -18 196 -71 298 -74 142 -201 253 -352 307 -96 35 -298 42 -392 14z m313 -341 c54 -28 115 -88 144 -143 19 -36 23 -58 23 -138 0 -109 -17 -152 -85 -220 -68 -68 -111 -85 -220 -85 -80 0 -102 4 -138 23 -55 30 -115 90 -143 144 -27 52 -36 164 -20 225 24 87 119 186 205 213 54 17 186 6 234 -19z"
})));

/***/ }),

/***/ "./src/admin/Components/App.js":
/*!*************************************!*\
  !*** ./src/admin/Components/App.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "../plugin-slug/node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "../plugin-slug/node_modules/react-router/dist/index.js");
/* harmony import */ var _bpl_tools_Admin_Demos__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Demos */ "../bpl-tools/Admin/Demos/index.js");
/* harmony import */ var _bpl_tools_Admin_Pricing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Pricing */ "../bpl-tools/Admin/Pricing/index.js");
/* harmony import */ var _bpl_tools_Admin_FeatureCompare__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/FeatureCompare */ "../bpl-tools/Admin/FeatureCompare/index.js");
/* harmony import */ var _bpl_tools_Admin_OurPlugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/OurPlugins */ "../bpl-tools/Admin/OurPlugins/index.js");
/* harmony import */ var _bpl_tools_Admin_Blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Blocks */ "../bpl-tools/Admin/Blocks/index.js");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Layout */ "./src/admin/Components/Layout.js");
/* harmony import */ var _Welcome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Welcome */ "./src/admin/Components/Welcome.js");
/* harmony import */ var _Settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Settings */ "./src/admin/Components/Settings.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/data */ "./src/admin/utils/data.js");






// import Activation from "../../../../bpl-tools/Admin/Activation";






const App = props => {
  const {
    disabledBlocks: initialDisabledBlocks,
    disabledBlocksNonce,
    adminUrl
  } = props;
  const [disabledBlocks, setDisabledBlocks] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialDisabledBlocks || []);
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const handleBlocksChange = updatedBlocks => {
    setDisabledBlocks(updatedBlocks);
    setStatus("loading");
    const formData = new FormData();
    formData.append("action", "vgb_disabled_blocks");
    formData.append("_wpnonce", disabledBlocksNonce);
    formData.append("data", JSON.stringify(updatedBlocks));
    fetch(`${adminUrl}admin-ajax.php`, {
      method: "POST",
      body: formData
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }).catch(() => {
      setStatus("error");
    });
  };
  const appProps = {
    ...props,
    disabledBlocks,
    status,
    onChange: handleBlocksChange
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.HashRouter, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Routes, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "/",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Layout__WEBPACK_IMPORTED_MODULE_6__["default"], {
      ...appProps
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    index: true,
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Welcome__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "welcome",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Welcome__WEBPACK_IMPORTED_MODULE_7__["default"], {
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "demos",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Demos__WEBPACK_IMPORTED_MODULE_1__["default"], {
      demoInfo: _utils_data__WEBPACK_IMPORTED_MODULE_9__.demoInfo,
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "pricing",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Pricing__WEBPACK_IMPORTED_MODULE_2__["default"], {
      pricingInfo: _utils_data__WEBPACK_IMPORTED_MODULE_9__.pricingInfo,
      options: {},
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "feature-comparison",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_FeatureCompare__WEBPACK_IMPORTED_MODULE_3__["default"], {
      plans: ["free", "pro"],
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "blocks",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Blocks__WEBPACK_IMPORTED_MODULE_5__["default"], {
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "our-plugins",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_OurPlugins__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "settings",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Settings__WEBPACK_IMPORTED_MODULE_8__["default"], {
      ...appProps
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Route, {
    path: "*",
    element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Navigate, {
      to: "/welcome",
      replace: true
    })
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/admin/Components/Layout.js":
/*!****************************************!*\
  !*** ./src/admin/Components/Layout.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../plugin-slug/node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "../plugin-slug/node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _bpl_tools_Admin_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Header */ "../bpl-tools/Admin/Header/index.js");



const navigation = [{
  name: "Welcome",
  href: "/welcome"
}, {
  name: "Blocks",
  href: "/blocks"
}, {
  name: "Demos",
  href: "/demos"
}, {
  name: "Pricing",
  href: "/pricing"
}, {
  name: "Feature Comparison",
  href: "/feature-comparison"
}, {
  name: "Settings",
  href: "/settings"
}];
const Layout = props => {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Header__WEBPACK_IMPORTED_MODULE_1__["default"], {
    ...props
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "bPlDashboardNav"
  }, navigation?.map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
    key: index,
    to: item.href,
    className: `navLink ${location.pathname === item.href ? "active" : ""}`
  }, item.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "bPlDashboardMain"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.Outlet, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/admin/Components/Settings.js":
/*!******************************************!*\
  !*** ./src/admin/Components/Settings.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



const Settings = ({
  deleteDataOnUninstall,
  uninstallNonce,
  adminUrl
}) => {
  const [enabled, setEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(deleteDataOnUninstall);
  const [notice, setNotice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleToggle = () => {
    const newValue = !enabled;

    // Show confirm dialog when enabling (destructive action)
    if (newValue) {
      const confirmed = window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure? This will permanently delete all Video Gallery Block posts and settings when the plugin is uninstalled.', 'video-gallery-block'));
      if (!confirmed) return;
    }
    setIsLoading(true);
    setNotice('');
    const formData = new FormData();
    formData.append('action', 'vgbSaveUninstallOption');
    formData.append('nonce', uninstallNonce);
    formData.append('enabled', String(newValue));
    fetch(`${adminUrl}admin-ajax.php`, {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      if (res.success) {
        setEnabled(res.data.enabled);
        setNotice(res.data.message);
      } else {
        setNotice(res.data?.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to save setting.', 'video-gallery-block'));
      }
    }).catch(() => {
      setNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to save setting. Network error.', 'video-gallery-block'));
    }).finally(() => {
      setIsLoading(false);
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bPlDashboardSettings bPlDashboardCard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete Data on Uninstall', 'video-gallery-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('When enabled, all plugin data will be permanently deleted when you uninstall (delete) the plugin. This includes:', 'video-gallery-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All video gallery block posts', 'video-gallery-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All plugin settings and configurations', 'video-gallery-block'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "settingsWarning"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('⚠️ This action cannot be undone. Your data will be safe if you only deactivate the plugin.', 'video-gallery-block')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "settingsControl"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "toggleControl"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: enabled,
    onChange: handleToggle,
    disabled: isLoading
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "toggleSlider"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "toggleLabel"
  }, enabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data will be deleted on uninstall', 'video-gallery-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data will be preserved on uninstall', 'video-gallery-block'))), notice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `settingsNotice ${enabled ? 'warning' : 'success'}`
  }, notice));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

/***/ }),

/***/ "./src/admin/Components/Welcome.js":
/*!*****************************************!*\
  !*** ./src/admin/Components/Welcome.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bpl_tools_Admin_Overview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Overview */ "../bpl-tools/Admin/Overview/index.js");
/* harmony import */ var _bpl_tools_Admin_Changelog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/Changelog */ "../bpl-tools/Admin/Changelog/index.js");
/* harmony import */ var _bpl_tools_Admin_ProAds__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../bpl-tools/Admin/ProAds */ "../bpl-tools/Admin/ProAds/index.js");





const Welcome = props => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Overview__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ...props
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(480px, 100%), 1fr))',
      gap: '32px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_Changelog__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...props,
    limit: 1,
    loadMoreLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View More Changelogs', 'video-gallery-block')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bpl_tools_Admin_ProAds__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ...props
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Welcome);

/***/ }),

/***/ "./src/admin/utils/blocks.js":
/*!***********************************!*\
  !*** ./src/admin/utils/blocks.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Components/Common/utils/icons */ "./src/Components/Common/utils/icons.js");

const siteURL = "https://bblockswp.com";
const demoLink = `${siteURL}/demo`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  name: "vgb/video-gallery",
  title: "Video Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoGalleryIcon,
  demo: `${demoLink}/video-gallery-block-default/`,
  status: "published",
  required: true
}, {
  name: "vgblk/lightbox-video-gallery",
  title: "Lightbox Video Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.lightBoxIcon,
  demo: `${demoLink}/video-gallery-block-lightbox-video-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/masonry-video-grid-one",
  title: "Masonry Video Grid",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.masonryVideoGridIcon,
  demo: `${demoLink}/video-gallery-block-masonry-video-grid/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/parallax-row-video-gallery",
  title: "Parallax Row Video Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.parallaxRowIcon,
  demo: `${demoLink}/video-gallery-block-parallax-row-video-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/slider-autoplay-video",
  title: "Slider Autoplay Video",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.sliderAutoplayIcon,
  demo: `${demoLink}/video-gallery-block-slider-autoplay-video/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-carousel-gallery",
  title: "Video Carousel Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoCarouselIcon,
  demo: `${demoLink}/video-gallery-block-video-carousel-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-playlist-gallery",
  title: "Video Playlist Gallery",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoPlaylistIcon,
  demo: `${demoLink}/video-gallery-block-video-playlist-gallery/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-slider",
  title: "Video Slider",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoSliderIcon,
  demo: `${demoLink}/video-gallery-block-video-slider/`,
  status: "published",
  isPremium: true
}, {
  name: "vgblk/video-testimonial-section",
  title: "Video Testimonial Section",
  icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.testimonialIcon,
  demo: `${demoLink}/video-gallery-block-video-testimonial-section/`,
  status: "published",
  isPremium: true
}]);

/***/ }),

/***/ "./src/admin/utils/data.js":
/*!*********************************!*\
  !*** ./src/admin/utils/data.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dashboardInfo: () => (/* binding */ dashboardInfo),
/* harmony export */   demoInfo: () => (/* binding */ demoInfo),
/* harmony export */   pricingInfo: () => (/* binding */ pricingInfo)
/* harmony export */ });
/* harmony import */ var _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Components/Common/utils/icons */ "./src/Components/Common/utils/icons.js");
/* harmony import */ var _blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks */ "./src/admin/utils/blocks.js");


const slug = "video-gallery-block";
const dashboardInfo = info => {
  const {
    version,
    licenseActiveNonce,
    vgbDisabledBlocks,
    disabledBlocksNonce,
    adminUrl,
    uninstallNonce,
    deleteDataOnUninstall
  } = info;
  return {
    name: `Video Gallery Block`,
    displayName: `Video Gallery Block - Display your videos as a gallery in a professional way`,
    description: "A lightweight Gutenberg block plugin for WordPress that lets you easily create responsive video galleries with albums, filters, captions, and lightbox support. Showcase YouTube, Vimeo, Wistia, or self hosted videos in a lightbox grid layout directly in the block editor.",
    slug,
    version,
    licenseActiveNonce,
    uninstallNonce,
    deleteDataOnUninstall,
    disabledBlocks: vgbDisabledBlocks,
    disabledBlocksNonce,
    adminUrl,
    allBlocks: _blocks__WEBPACK_IMPORTED_MODULE_1__["default"],
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/uploads/2026/01/video-gallery-block.png`
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/${slug}/`,
      //   docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`
    },
    freemius: {
      product_id: 20637,
      plan_id: 34353,
      public_key: "pk_02d017aab6844d54db3238a59e91c"
    },
    changelogs: [{
      version: "1.1.1 - 12 Aug 2025",
      list: ["Fixed minor issues.", "Added 8 new block styles.", "Add: Updated New Dashboard"],
      type: "update"
    }, {
      version: "1.1.0 - 30 Jan 2025",
      list: ["Updated Fancybox library to v5."],
      type: "update"
    }, {
      version: "1.0.8 - 27 Nov 2024",
      list: ["Added option to hide the 'All' album filter."],
      type: "new"
    }, {
      version: "1.0.7 - 27 Nov 2024",
      list: ["Added custom label option for common filter."],
      type: "new"
    }, {
      version: "1.0.6",
      list: ["Added gallery shadow options."],
      type: "new"
    }],
    proFeatures: ["8 premium blocks including Slider, Carousel, Playlist, and Masonry.", "Masonry and mixed-ratio layouts.", "Sliders and carousels with autoplay.", "Playlist gallery with navigation.", "Parallax background video sections.", "Advanced typography and overlays.", "Custom navigation and player controls.", "WooCommerce product carousel.", "Priority support."],
    startButton: {
      label: "Start Now",
      url: `wp-admin/post-new.php?post_type=video-gallery-block`
      // url: `wp-admin/post-new.php?post_type=page&title=Video Gallery Block&content=<!-- wp:vgb/video-gallery /-->&nonce=${nonce}`,
    }
  };
};
const demoInfo = {
  allInOneLabel: "See All Demos",
  allInOneLink: "https://bblockswp.com/demo/video-gallery-block-all-demos/",
  demos: [{
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoGalleryIcon,
    title: "Video Gallery Block Default",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-default/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.testimonialIcon,
    title: "Video Testimonial Section",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-video-testimonial-section/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.parallaxRowIcon,
    title: "Parallax Row Video Gallery",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-parallax-row-video-gallery/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoSliderIcon,
    title: "Video Slider",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-video-slider/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.sliderAutoplayIcon,
    title: "Slider Autoplay Video",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-slider-autoplay-video/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.lightBoxIcon,
    title: "Lightbox Gallery",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-lightbox-video-gallery/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.masonryVideoGridIcon,
    title: "Masonry Video Grid",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-masonry-video-grid/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoPlaylistIcon,
    title: "Video Playlist Gallery",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-video-playlist-gallery/"
  }, {
    icon: _Components_Common_utils_icons__WEBPACK_IMPORTED_MODULE_0__.videoCarouselIcon,
    title: "Video Carousel Gallery",
    type: "iframe",
    url: "https://bblockswp.com/demo/video-gallery-block-video-carousel-gallery/"
  }]
};
const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
  // Optional
  pluginId: 20637,
  planId: 34353,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜"
  },
  featured: {
    selected: 3 // choose from licenses item
  }
};

/***/ }),

/***/ "../bpl-tools/Admin/Blocks/style.scss":
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Blocks/style.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Changelog/style.scss":
/*!***********************************************!*\
  !*** ../bpl-tools/Admin/Changelog/style.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Demos/style.scss":
/*!*******************************************!*\
  !*** ../bpl-tools/Admin/Demos/style.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/FeatureCompare/style.scss":
/*!****************************************************!*\
  !*** ../bpl-tools/Admin/FeatureCompare/style.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Header/style.scss":
/*!********************************************!*\
  !*** ../bpl-tools/Admin/Header/style.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/OurPlugins/style.scss":
/*!************************************************!*\
  !*** ../bpl-tools/Admin/OurPlugins/style.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Overview/VideoPlayer.scss":
/*!****************************************************!*\
  !*** ../bpl-tools/Admin/Overview/VideoPlayer.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Overview/style.scss":
/*!**********************************************!*\
  !*** ../bpl-tools/Admin/Overview/style.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/Pricing/style.scss":
/*!*********************************************!*\
  !*** ../bpl-tools/Admin/Pricing/style.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Admin/ProAds/style.scss":
/*!********************************************!*\
  !*** ../bpl-tools/Admin/ProAds/style.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Components/Button/style.scss":
/*!*************************************************!*\
  !*** ../bpl-tools/Components/Button/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../bpl-tools/Components/Loading/style.scss":
/*!**************************************************!*\
  !*** ../bpl-tools/Components/Loading/style.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/admin/dashboard.scss":
/*!**********************************!*\
  !*** ./src/admin/dashboard.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../plugin-slug/node_modules/react-dom/client.js":
/*!*******************************************************!*\
  !*** ../plugin-slug/node_modules/react-dom/client.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "../plugin-slug/node_modules/react-router-dom/dist/index.js":
/*!******************************************************************!*\
  !*** ../plugin-slug/node_modules/react-router-dom/dist/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortedDeferredError: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.AbortedDeferredError),
/* harmony export */   Await: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Await),
/* harmony export */   BrowserRouter: () => (/* binding */ BrowserRouter),
/* harmony export */   Form: () => (/* binding */ Form),
/* harmony export */   HashRouter: () => (/* binding */ HashRouter),
/* harmony export */   Link: () => (/* binding */ Link),
/* harmony export */   MemoryRouter: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.MemoryRouter),
/* harmony export */   NavLink: () => (/* binding */ NavLink),
/* harmony export */   Navigate: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Navigate),
/* harmony export */   NavigationType: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Action),
/* harmony export */   Outlet: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Outlet),
/* harmony export */   Route: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Route),
/* harmony export */   Router: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Router),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   Routes: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.Routes),
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration),
/* harmony export */   UNSAFE_DataRouterContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterContext),
/* harmony export */   UNSAFE_DataRouterStateContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext),
/* harmony export */   UNSAFE_ErrorResponseImpl: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_ErrorResponseImpl),
/* harmony export */   UNSAFE_FetchersContext: () => (/* binding */ FetchersContext),
/* harmony export */   UNSAFE_LocationContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_LocationContext),
/* harmony export */   UNSAFE_NavigationContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext),
/* harmony export */   UNSAFE_RouteContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_RouteContext),
/* harmony export */   UNSAFE_ViewTransitionContext: () => (/* binding */ ViewTransitionContext),
/* harmony export */   UNSAFE_useRouteId: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_useRouteId),
/* harmony export */   UNSAFE_useScrollRestoration: () => (/* binding */ useScrollRestoration),
/* harmony export */   createBrowserRouter: () => (/* binding */ createBrowserRouter),
/* harmony export */   createHashRouter: () => (/* binding */ createHashRouter),
/* harmony export */   createMemoryRouter: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.createMemoryRouter),
/* harmony export */   createPath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createPath),
/* harmony export */   createRoutesFromChildren: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.createRoutesFromChildren),
/* harmony export */   createRoutesFromElements: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.createRoutesFromElements),
/* harmony export */   createSearchParams: () => (/* binding */ createSearchParams),
/* harmony export */   defer: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.defer),
/* harmony export */   generatePath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.generatePath),
/* harmony export */   isRouteErrorResponse: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.isRouteErrorResponse),
/* harmony export */   json: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.json),
/* harmony export */   matchPath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.matchPath),
/* harmony export */   matchRoutes: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.matchRoutes),
/* harmony export */   parsePath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.parsePath),
/* harmony export */   redirect: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.redirect),
/* harmony export */   redirectDocument: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.redirectDocument),
/* harmony export */   renderMatches: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.renderMatches),
/* harmony export */   replace: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.replace),
/* harmony export */   resolvePath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.resolvePath),
/* harmony export */   unstable_HistoryRouter: () => (/* binding */ HistoryRouter),
/* harmony export */   unstable_usePrompt: () => (/* binding */ usePrompt),
/* harmony export */   useActionData: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useActionData),
/* harmony export */   useAsyncError: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useAsyncError),
/* harmony export */   useAsyncValue: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useAsyncValue),
/* harmony export */   useBeforeUnload: () => (/* binding */ useBeforeUnload),
/* harmony export */   useBlocker: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useBlocker),
/* harmony export */   useFetcher: () => (/* binding */ useFetcher),
/* harmony export */   useFetchers: () => (/* binding */ useFetchers),
/* harmony export */   useFormAction: () => (/* binding */ useFormAction),
/* harmony export */   useHref: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useHref),
/* harmony export */   useInRouterContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useInRouterContext),
/* harmony export */   useLinkClickHandler: () => (/* binding */ useLinkClickHandler),
/* harmony export */   useLoaderData: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useLoaderData),
/* harmony export */   useLocation: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation),
/* harmony export */   useMatch: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useMatch),
/* harmony export */   useMatches: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useMatches),
/* harmony export */   useNavigate: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate),
/* harmony export */   useNavigation: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigation),
/* harmony export */   useNavigationType: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigationType),
/* harmony export */   useOutlet: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useOutlet),
/* harmony export */   useOutletContext: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useOutletContext),
/* harmony export */   useParams: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useParams),
/* harmony export */   useResolvedPath: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath),
/* harmony export */   useRevalidator: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRevalidator),
/* harmony export */   useRouteError: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRouteError),
/* harmony export */   useRouteLoaderData: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRouteLoaderData),
/* harmony export */   useRoutes: () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_3__.useRoutes),
/* harmony export */   useSearchParams: () => (/* binding */ useSearchParams),
/* harmony export */   useSubmit: () => (/* binding */ useSubmit),
/* harmony export */   useViewTransitionState: () => (/* binding */ useViewTransitionState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "../plugin-slug/node_modules/react-router/dist/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @remix-run/router */ "../plugin-slug/node_modules/@remix-run/router/dist/router.js");
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */







function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (
  // Ignore everything but left clicks
  !target || target === "_self") &&
  // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    // Use `defaultSearchParams.forEach(...)` here instead of iterating of
    // `defaultSearchParams.keys()` to work-around a bug in Firefox related to
    // web extensions. Relevant Bugzilla tickets:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1414602
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1023984
    defaultSearchParams.forEach((_, key) => {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach(value => {
          searchParams.append(key, value);
        });
      }
    });
  }
  return searchParams;
}
// One-time check for submitter support
let _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(document.createElement("form"),
      // @ts-expect-error if FormData supports the submitter parameter, this will throw
      0);
      _formDataSupportsSubmitter = false;
    } catch (e) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
const supportedFormEncTypes = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
     true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(false, "\"" + encType + "\" is not a valid `encType` for `<Form>`/`<fetcher.Form>` " + ("and will default to \"" + defaultEncType + "\"")) : 0;
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    // When grabbing the action from the element, it will have had the basename
    // prefixed to ensure non-JS scenarios work, so strip it since we'll
    // re-prefix in the router
    let attr = target.getAttribute("action");
    action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(attr, basename) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
    }
    // <button>/<input type="submit"> may override attributes of <form>
    // When grabbing the action from the element, it will have had the basename
    // prefixed to ensure non-JS scenarios work, so strip it since we'll
    // re-prefix in the router
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(attr, basename) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    // Build a FormData object populated from a form and submitter
    formData = new FormData(form, target);
    // If this browser doesn't support the `FormData(el, submitter)` format,
    // then tack on the submitter value at the end.  This is a lightweight
    // solution that is not 100% spec compliant.  For complete support in older
    // browsers, consider using the `formdata-submitter-polyfill` package
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  // Send body for <Form encType="text/plain" so we encode it into text
  if (formData && encType === "text/plain") {
    body = formData;
    formData = undefined;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}

const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"],
  _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"],
  _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"];
// HEY YOU! DON'T TOUCH THIS VARIABLE!
//
// It is replaced with the proper version at build time via a babel plugin in
// the rollup config.
//
// Export a global property onto the window for React Router detection by the
// Core Web Vitals Technology Report.  This way they can configure the `wappalyzer`
// to detect and properly classify live websites as being built with React Router:
// https://github.com/HTTPArchive/wappalyzer/blob/main/src/technologies/r.json
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {
  // no-op
}
function createBrowserRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createBrowserHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_mapRouteProperties,
    dataStrategy: opts == null ? void 0 : opts.dataStrategy,
    patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
    window: opts == null ? void 0 : opts.window
  }).initialize();
}
function createHashRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createHashHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_mapRouteProperties,
    dataStrategy: opts == null ? void 0 : opts.dataStrategy,
    patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
    window: opts == null ? void 0 : opts.window
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  if (state && state.errors) {
    state = _extends({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    // Hey you!  If you change this, please change the corresponding logic in
    // serializeErrors in react-router-dom/server.tsx :)
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      // Attempt to reconstruct the right type of Error (i.e., ReferenceError)
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            // @ts-expect-error
            let error = new ErrorConstructor(val.message);
            // Wipe away the client-side stack trace.  Nothing to fill it in with
            // because we don't serialize SSR stack traces for security reasons
            error.stack = "";
            serialized[key] = error;
          } catch (e) {
            // no-op - fall through and create a normal Error
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        // Wipe away the client-side stack trace.  Nothing to fill it in with
        // because we don't serialize SSR stack traces for security reasons
        error.stack = "";
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
const ViewTransitionContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  isTransitioning: false
});
if (true) {
  ViewTransitionContext.displayName = "ViewTransition";
}
const FetchersContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(new Map());
if (true) {
  FetchersContext.displayName = "Fetchers";
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Components
////////////////////////////////////////////////////////////////////////////////
/**
  Webpack + React 17 fails to compile on any of the following because webpack
  complains that `startTransition` doesn't exist in `React`:
  * import { startTransition } from "react"
  * import * as React from from "react";
    "startTransition" in React ? React.startTransition(() => setState()) : setState()
  * import * as React from from "react";
    "startTransition" in React ? React["startTransition"](() => setState()) : setState()

  Moving it to a constant such as the following solves the Webpack/React 17 issue:
  * import * as React from from "react";
    const START_TRANSITION = "startTransition";
    START_TRANSITION in React ? React[START_TRANSITION](() => setState()) : setState()

  However, that introduces webpack/terser minification issues in production builds
  in React 18 where minification/obfuscation ends up removing the call of
  React.startTransition entirely from the first half of the ternary.  Grabbing
  this exported reference once up front resolves that issue.

  See https://github.com/remix-run/react-router/issues/10579
*/
const START_TRANSITION = "startTransition";
const startTransitionImpl = react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION];
const FLUSH_SYNC = "flushSync";
const flushSyncImpl = react_dom__WEBPACK_IMPORTED_MODULE_1__[FLUSH_SYNC];
const USE_ID = "useId";
const useIdImpl = react__WEBPACK_IMPORTED_MODULE_0__[USE_ID];
function startTransitionSafe(cb) {
  if (startTransitionImpl) {
    startTransitionImpl(cb);
  } else {
    cb();
  }
}
function flushSyncSafe(cb) {
  if (flushSyncImpl) {
    flushSyncImpl(cb);
  } else {
    cb();
  }
}
class Deferred {
  constructor() {
    this.status = "pending";
    this.promise = new Promise((resolve, reject) => {
      this.resolve = value => {
        if (this.status === "pending") {
          this.status = "resolved";
          resolve(value);
        }
      };
      this.reject = reason => {
        if (this.status === "pending") {
          this.status = "rejected";
          reject(reason);
        }
      };
    });
  }
}
/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future
  } = _ref;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let [pendingState, setPendingState] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [vtContext, setVtContext] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    isTransitioning: false
  });
  let [renderDfd, setRenderDfd] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [transition, setTransition] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let [interruption, setInterruption] = react__WEBPACK_IMPORTED_MODULE_0__.useState();
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useRef(new Map());
  let {
    v7_startTransition
  } = future || {};
  let optInStartTransition = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(cb => {
    if (v7_startTransition) {
      startTransitionSafe(cb);
    } else {
      cb();
    }
  }, [v7_startTransition]);
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((newState, _ref2) => {
    let {
      deletedFetchers,
      flushSync: flushSync,
      viewTransitionOpts: viewTransitionOpts
    } = _ref2;
    newState.fetchers.forEach((fetcher, key) => {
      if (fetcher.data !== undefined) {
        fetcherData.current.set(key, fetcher.data);
      }
    });
    deletedFetchers.forEach(key => fetcherData.current.delete(key));
    let isViewTransitionUnavailable = router.window == null || router.window.document == null || typeof router.window.document.startViewTransition !== "function";
    // If this isn't a view transition or it's not available in this browser,
    // just update and be done with it
    if (!viewTransitionOpts || isViewTransitionUnavailable) {
      if (flushSync) {
        flushSyncSafe(() => setStateImpl(newState));
      } else {
        optInStartTransition(() => setStateImpl(newState));
      }
      return;
    }
    // flushSync + startViewTransition
    if (flushSync) {
      // Flush through the context to mark DOM elements as transition=ing
      flushSyncSafe(() => {
        // Cancel any pending transitions
        if (transition) {
          renderDfd && renderDfd.resolve();
          transition.skipTransition();
        }
        setVtContext({
          isTransitioning: true,
          flushSync: true,
          currentLocation: viewTransitionOpts.currentLocation,
          nextLocation: viewTransitionOpts.nextLocation
        });
      });
      // Update the DOM
      let t = router.window.document.startViewTransition(() => {
        flushSyncSafe(() => setStateImpl(newState));
      });
      // Clean up after the animation completes
      t.finished.finally(() => {
        flushSyncSafe(() => {
          setRenderDfd(undefined);
          setTransition(undefined);
          setPendingState(undefined);
          setVtContext({
            isTransitioning: false
          });
        });
      });
      flushSyncSafe(() => setTransition(t));
      return;
    }
    // startTransition + startViewTransition
    if (transition) {
      // Interrupting an in-progress transition, cancel and let everything flush
      // out, and then kick off a new transition from the interruption state
      renderDfd && renderDfd.resolve();
      transition.skipTransition();
      setInterruption({
        state: newState,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    } else {
      // Completed navigation update with opted-in view transitions, let 'er rip
      setPendingState(newState);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: viewTransitionOpts.currentLocation,
        nextLocation: viewTransitionOpts.nextLocation
      });
    }
  }, [router.window, transition, renderDfd, fetcherData, optInStartTransition]);
  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  // When we start a view transition, create a Deferred we can use for the
  // eventual "completed" render
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (vtContext.isTransitioning && !vtContext.flushSync) {
      setRenderDfd(new Deferred());
    }
  }, [vtContext]);
  // Once the deferred is created, kick off startViewTransition() to update the
  // DOM and then wait on the Deferred to resolve (indicating the DOM update has
  // happened)
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && router.window) {
      let newState = pendingState;
      let renderPromise = renderDfd.promise;
      let transition = router.window.document.startViewTransition(async () => {
        optInStartTransition(() => setStateImpl(newState));
        await renderPromise;
      });
      transition.finished.finally(() => {
        setRenderDfd(undefined);
        setTransition(undefined);
        setPendingState(undefined);
        setVtContext({
          isTransitioning: false
        });
      });
      setTransition(transition);
    }
  }, [optInStartTransition, pendingState, renderDfd, router.window]);
  // When the new location finally renders and is committed to the DOM, this
  // effect will run to resolve the transition
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
      renderDfd.resolve();
    }
  }, [renderDfd, transition, state.location, pendingState]);
  // If we get interrupted with a new navigation during a transition, we skip
  // the active transition, let it cleanup, then kick it off again here
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!vtContext.isTransitioning && interruption) {
      setPendingState(interruption.state);
      setVtContext({
        isTransitioning: true,
        flushSync: false,
        currentLocation: interruption.currentLocation,
        nextLocation: interruption.nextLocation
      });
      setInterruption(undefined);
    }
  }, [vtContext.isTransitioning, interruption]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
     true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(fallbackElement == null || !router.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using " + "`v7_partialHydration`, use a `HydrateFallback` component instead") : 0;
    // Only log this once on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]);
  let routerFuture = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    v7_relativeSplatPath: router.future.v7_relativeSplatPath
  }), [router.future.v7_relativeSplatPath]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_logV6DeprecationWarnings)(future, router.future), [future, router.future]);
  // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FetchersContext.Provider, {
    value: fetcherData.current
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewTransitionContext.Provider, {
    value: vtContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator,
    future: routerFuture
  }, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MemoizedDataRoutes, {
    routes: router.routes,
    future: router.future,
    state: state
  }) : fallbackElement))))), null);
}
// Memoize to avoid re-renders when updating `ViewTransitionContext`
const MemoizedDataRoutes = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(DataRoutes);
function DataRoutes(_ref3) {
  let {
    routes,
    future,
    state
  } = _ref3;
  return (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_useRoutesImpl)(routes, undefined, state, future);
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window
  } = _ref4;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createBrowserHistory)({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_logV6DeprecationWarnings)(future), [future]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
/**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */
function HashRouter(_ref5) {
  let {
    basename,
    children,
    future,
    window
  } = _ref5;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createHashHistory)({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_logV6DeprecationWarnings)(future), [future]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
/**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */
function HistoryRouter(_ref6) {
  let {
    basename,
    children,
    future,
    history
  } = _ref6;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_logV6DeprecationWarnings)(future), [future]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
if (true) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/**
 * The public API for rendering a history-aware `<a>`.
 */
const Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      to,
      preventScrollReset,
      viewTransition
    } = _ref7,
    rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  // Rendered into <a href> for absolute URLs
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    // Render the absolute href server- and client-side
    absoluteHref = to;
    // Only check for external origins client-side
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          // Strip the protocol/origin/basename for same-origin absolute URLs
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        // We can't do external URL detection without a valid URL
         true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(false, "<Link to=\"" + to + "\"> contains an invalid URL which will probably break " + "when clicked - please update to a valid URL path.") : 0;
      }
    }
  }
  // Rendered into <a href> for relative URLs
  let href = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useHref)(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    }))
  );
});
if (true) {
  Link.displayName = "Link";
}
/**
 * A `<Link>` wrapper that knows if it's "active" or not.
 */
const NavLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      viewTransition,
      children
    } = _ref8,
    rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(to, {
    relative: rest.relative
  });
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext);
  let {
    navigator,
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let isTransitioning = routerState != null &&
  // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename) {
    nextLocationPathname = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(nextLocationPathname, basename) || nextLocationPathname;
  }
  // If the `to` has a trailing slash, look at that exact spot.  Otherwise,
  // we're looking for a slash _after_ what's in `to`.  For example:
  //
  // <NavLink to="/users"> and <NavLink to="/users/">
  // both want to look for a / at index 6 to match URL `/users/matt`
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to,
    viewTransition: viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
if (true) {
  NavLink.displayName = "NavLink";
}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */
const Form = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref9, forwardedRef) => {
  let {
      fetcherKey,
      navigate,
      reloadDocument,
      replace,
      state,
      method = defaultMethod,
      action,
      onSubmit,
      relative,
      preventScrollReset,
      viewTransition
    } = _ref9,
    props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace,
      state,
      relative,
      preventScrollReset,
      viewTransition
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (true) {
  Form.displayName = "Form";
}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */
function ScrollRestoration(_ref10) {
  let {
    getKey,
    storageKey
  } = _ref10;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}
if (true) {
  ScrollRestoration.displayName = "ScrollRestoration";
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////
var DataRouterHook;
(function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmit"] = "useSubmit";
  DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook["UseFetcher"] = "useFetcher";
  DataRouterHook["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function (DataRouterStateHook) {
  DataRouterStateHook["UseFetcher"] = "useFetcher";
  DataRouterStateHook["UseFetchers"] = "useFetchers";
  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
// Internal hooks
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterContext);
  !ctx ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_DataRouterStateContext);
  !state ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}
// External hooks
/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(to, {
    relative
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set
      let replace = replaceProp !== undefined ? replaceProp : (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createPath)(location) === (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createPath)(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */
function useSearchParams(defaultInit) {
   true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params.") : 0;
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() =>
  // Only merge in the defaults if we haven't yet called setSearchParams.
  // Once we call that we want those to take precedence, otherwise you can't
  // remove a param with setSearchParams({}) if it has an initial value
  getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigate)();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
  }
}
let fetcherId = 0;
let getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */
function useSubmit() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmit);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let currentRouteId = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_useRouteId)();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        flushSync: options.flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        flushSync: options.flushSync,
        viewTransition: options.viewTransition
      });
    }
  }, [router, basename, currentRouteId]);
}
// v7: Eventually we should deprecate this entirely in favor of using the
// router method directly?
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_RouteContext);
  !routeContext ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFormAction must be used inside a RouteContext") : 0 : void 0;
  let [match] = routeContext.matches.slice(-1);
  // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath
  let path = _extends({}, (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(action ? action : ".", {
    relative
  }));
  // If no action was specified, browsers will persist current search params
  // when determining the path, so match that behavior
  // https://github.com/remix-run/remix/issues/927
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  if (action == null) {
    // Safe to write to this directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    path.search = location.search;
    // When grabbing search params from the URL, remove any included ?index param
    // since it might not apply to our contextual route.  We add it back based
    // on match.route.index below
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some(v => v === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter(v => v).forEach(v => params.append("index", v));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : (0,react_router__WEBPACK_IMPORTED_MODULE_2__.joinPaths)([basename, path.pathname]);
  }
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.createPath)(path);
}
// TODO: (v7) Change the useFetcher generic default from `any` to `unknown`
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */
function useFetcher(_temp3) {
  var _route$matches;
  let {
    key
  } = _temp3 === void 0 ? {} : _temp3;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseFetcher);
  let state = useDataRouterState(DataRouterStateHook.UseFetcher);
  let fetcherData = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FetchersContext);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_RouteContext);
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !fetcherData ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFetcher must be used inside a FetchersContext") : 0 : void 0;
  !route ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFetcher must be used inside a RouteContext") : 0 : void 0;
  !(routeId != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "useFetcher can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  // Fetcher key handling
  // OK to call conditionally to feature detect `useId`
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let defaultKey = useIdImpl ? useIdImpl() : "";
  let [fetcherKey, setFetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(key || defaultKey);
  if (key && key !== fetcherKey) {
    setFetcherKey(key);
  } else if (!fetcherKey) {
    // We will only fall through here when `useId` is not available
    setFetcherKey(getUniqueFetcherId());
  }
  // Registration/cleanup
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    router.getFetcher(fetcherKey);
    return () => {
      // Tell the router we've unmounted - if v7_fetcherPersist is enabled this
      // will not delete immediately but instead queue up a delete after the
      // fetcher returns to an `idle` state
      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  // Fetcher additions
  let load = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((href, opts) => {
    !routeId ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "No routeId available for fetcher.load()") : 0 : void 0;
    router.fetch(fetcherKey, routeId, href, opts);
  }, [fetcherKey, routeId, router]);
  let submitImpl = useSubmit();
  let submit = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((target, opts) => {
    submitImpl(target, _extends({}, opts, {
      navigate: false,
      fetcherKey
    }));
  }, [fetcherKey, submitImpl]);
  let FetcherForm = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let FetcherForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Form, _extends({}, props, {
        navigate: false,
        fetcherKey: fetcherKey,
        ref: ref
      }));
    });
    if (true) {
      FetcherForm.displayName = "fetcher.Form";
    }
    return FetcherForm;
  }, [fetcherKey]);
  // Exposed FetcherWithComponents
  let fetcher = state.fetchers.get(fetcherKey) || react_router__WEBPACK_IMPORTED_MODULE_2__.IDLE_FETCHER;
  let data = fetcherData.get(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => _extends({
    Form: FetcherForm,
    submit,
    load
  }, fetcher, {
    data
  }), [FetcherForm, submit, load, fetcher, data]);
  return fetcherWithComponents;
}
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */
function useFetchers() {
  let state = useDataRouterState(DataRouterStateHook.UseFetchers);
  return Array.from(state.fetchers.entries()).map(_ref11 => {
    let [key, fetcher] = _ref11;
    return _extends({}, fetcher, {
      key
    });
  });
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
/**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */
function useScrollRestoration(_temp4) {
  let {
    getKey,
    storageKey
  } = _temp4 === void 0 ? {} : _temp4;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_3__.UNSAFE_NavigationContext);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  let matches = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useMatches)();
  let navigation = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useNavigation)();
  // Trigger manual scroll restoration while we're active
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  // Save positions on pagehide
  usePageHide(react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    try {
      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    } catch (error) {
       true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_warning)(false, "Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (" + error + ").") : 0;
    }
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches]));
  // Read in any saved scroll locations
  if (typeof document !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
        // no-op, use default empty object
      }
    }, [storageKey]);
    // Enable scroll restoration in the router
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      let getKeyWithoutBasename = getKey && basename !== "/" ? (location, matches) => getKey( // Strip the basename to match useLocation()
      _extends({}, location, {
        pathname: (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(location.pathname, basename) || location.pathname
      }), matches) : getKey;
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename, getKey]);
    // Restore scrolling when state.restoreScrollPosition changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      // Explicit false means don't do anything (used for submissions)
      if (restoreScrollPosition === false) {
        return;
      }
      // been here before, scroll to it
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      // try to scroll to the hash
      if (location.hash) {
        let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      // Don't reset if this navigation opted out
      if (preventScrollReset === true) {
        return;
      }
      // otherwise go to the top on new locations
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
/**
 * Setup a callback to be fired on the window's `beforeunload` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Setup a callback to be fired on the window's `pagehide` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.  This event is better supported than beforeunload across browsers.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Wrapper around useBlocker to show a window.confirm prompt to users instead
 * of building a custom UI with useBlocker.
 *
 * Warning: This has *a lot of rough edges* and behaves very differently (and
 * very incorrectly in some cases) across browsers if user click addition
 * back/forward navigations while the confirm is open.  Use at your own risk.
 */
function usePrompt(_ref12) {
  let {
    when,
    message
  } = _ref12;
  let blocker = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useBlocker)(when);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        // This timeout is needed to avoid a weird "race" on POP navigations
        // between the `window.history` revert navigation and the result of
        // `window.confirm`
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
}
/**
 * Return a boolean indicating if there is an active view transition to the
 * given href.  You can use this value to render CSS classes or viewTransitionName
 * styles onto your elements
 *
 * @param href The destination href
 * @param [opts.relative] Relative routing type ("route" | "path")
 */
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ViewTransitionContext);
  !(vtContext != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_invariant)(false, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  " + "Did you accidentally import `RouterProvider` from `react-router`?") : 0 : void 0;
  let {
    basename
  } = useDataRouterContext(DataRouterHook.useViewTransitionState);
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useResolvedPath)(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
  let nextPath = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.stripBasename)(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
  // Transition is active if we're going to or coming from the indicated
  // destination.  This ensures that other PUSH navigations that reverse
  // an indicated transition apply.  I.e., on the list view you have:
  //
  //   <NavLink to="/details/1" viewTransition>
  //
  // If you click the breadcrumb back to the list view:
  //
  //   <NavLink to="/list" viewTransition>
  //
  // We should apply the transition because it's indicated as active going
  // from /list -> /details/1 and therefore should be active on the reverse
  // (even though this isn't strictly a POP reverse)
  return (0,react_router__WEBPACK_IMPORTED_MODULE_2__.matchPath)(path.pathname, nextPath) != null || (0,react_router__WEBPACK_IMPORTED_MODULE_2__.matchPath)(path.pathname, currentPath) != null;
}
//#endregion


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "../plugin-slug/node_modules/react-router/dist/index.js":
/*!**************************************************************!*\
  !*** ../plugin-slug/node_modules/react-router/dist/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbortedDeferredError: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError),
/* harmony export */   Await: () => (/* binding */ Await),
/* harmony export */   MemoryRouter: () => (/* binding */ MemoryRouter),
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   NavigationType: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action),
/* harmony export */   Outlet: () => (/* binding */ Outlet),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   Routes: () => (/* binding */ Routes),
/* harmony export */   UNSAFE_DataRouterContext: () => (/* binding */ DataRouterContext),
/* harmony export */   UNSAFE_DataRouterStateContext: () => (/* binding */ DataRouterStateContext),
/* harmony export */   UNSAFE_LocationContext: () => (/* binding */ LocationContext),
/* harmony export */   UNSAFE_NavigationContext: () => (/* binding */ NavigationContext),
/* harmony export */   UNSAFE_RouteContext: () => (/* binding */ RouteContext),
/* harmony export */   UNSAFE_logV6DeprecationWarnings: () => (/* binding */ logV6DeprecationWarnings),
/* harmony export */   UNSAFE_mapRouteProperties: () => (/* binding */ mapRouteProperties),
/* harmony export */   UNSAFE_useRouteId: () => (/* binding */ useRouteId),
/* harmony export */   UNSAFE_useRoutesImpl: () => (/* binding */ useRoutesImpl),
/* harmony export */   createMemoryRouter: () => (/* binding */ createMemoryRouter),
/* harmony export */   createPath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createPath),
/* harmony export */   createRoutesFromChildren: () => (/* binding */ createRoutesFromChildren),
/* harmony export */   createRoutesFromElements: () => (/* binding */ createRoutesFromChildren),
/* harmony export */   defer: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   generatePath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.generatePath),
/* harmony export */   isRouteErrorResponse: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse),
/* harmony export */   json: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   matchPath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath),
/* harmony export */   matchRoutes: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes),
/* harmony export */   parsePath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath),
/* harmony export */   redirect: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.redirect),
/* harmony export */   redirectDocument: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.redirectDocument),
/* harmony export */   renderMatches: () => (/* binding */ renderMatches),
/* harmony export */   replace: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.replace),
/* harmony export */   resolvePath: () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolvePath),
/* harmony export */   useActionData: () => (/* binding */ useActionData),
/* harmony export */   useAsyncError: () => (/* binding */ useAsyncError),
/* harmony export */   useAsyncValue: () => (/* binding */ useAsyncValue),
/* harmony export */   useBlocker: () => (/* binding */ useBlocker),
/* harmony export */   useHref: () => (/* binding */ useHref),
/* harmony export */   useInRouterContext: () => (/* binding */ useInRouterContext),
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData),
/* harmony export */   useLocation: () => (/* binding */ useLocation),
/* harmony export */   useMatch: () => (/* binding */ useMatch),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate),
/* harmony export */   useNavigation: () => (/* binding */ useNavigation),
/* harmony export */   useNavigationType: () => (/* binding */ useNavigationType),
/* harmony export */   useOutlet: () => (/* binding */ useOutlet),
/* harmony export */   useOutletContext: () => (/* binding */ useOutletContext),
/* harmony export */   useParams: () => (/* binding */ useParams),
/* harmony export */   useResolvedPath: () => (/* binding */ useResolvedPath),
/* harmony export */   useRevalidator: () => (/* binding */ useRevalidator),
/* harmony export */   useRouteError: () => (/* binding */ useRouteError),
/* harmony export */   useRouteLoaderData: () => (/* binding */ useRouteLoaderData),
/* harmony export */   useRoutes: () => (/* binding */ useRoutes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _remix_run_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix-run/router */ "../plugin-slug/node_modules/@remix-run/router/dist/router.js");
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */




function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// Create react-specific types from the agnostic types in @remix-run/router to
// export from react-router
const DataRouterContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  DataRouterContext.displayName = "DataRouter";
}
const DataRouterStateContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  DataRouterStateContext.displayName = "DataRouterState";
}
const AwaitContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  AwaitContext.displayName = "Await";
}

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level `<Router>` API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */

const NavigationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  NavigationContext.displayName = "Navigation";
}
const LocationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  LocationContext.displayName = "Location";
}
const RouteContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (true) {
  RouteContext.displayName = "Route";
}
const RouteErrorContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  RouteErrorContext.displayName = "RouteError";
}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/v6/hooks/use-href
 */
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useHref() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;

  // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}

/**
 * Returns true if this component is a descendant of a `<Router>`.
 *
 * @see https://reactrouter.com/v6/hooks/use-in-router-context
 */
function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext) != null;
}

/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/v6/hooks/use-location
 */
function useLocation() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useLocation() may be used only in the context of a <Router> component.") : 0 : void 0;
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).location;
}

/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/v6/hooks/use-navigation-type
 */
function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).navigationType;
}

/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * `<NavLink>`.
 *
 * @see https://reactrouter.com/v6/hooks/use-match
 */
function useMatch(pattern) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useMatch() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    pathname
  } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath)(pattern, (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_decodePath)(pathname)), [pathname, pattern]);
}

/**
 * The interface for the navigate() function returned from useNavigate().
 */

const navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered.";

// Mute warnings for calls to useNavigate in SSR environments
function useIsomorphicLayoutEffect(cb) {
  let isStatic = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static;
  if (!isStatic) {
    // We should be able to get rid of this once react 18.3 is released
    // See: https://github.com/facebook/react/pull/26395
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(cb);
  }
}

/**
 * Returns an imperative method for changing the location. Used by `<Link>`s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/v6/hooks/use-navigate
 */
function useNavigate() {
  let {
    isDataRoute
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useNavigate() may be used only in the context of a <Router> component.") : 0 : void 0;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let {
    basename,
    future,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getResolveToMatches)(matches, future.v7_relativeSplatPath));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0;

    // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our history listener yet
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");

    // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history (but only if we're not in a data router,
    // otherwise it'll prepend the basename inside of the router).
    // If this is a root navigation, then we navigate to the raw basename
    // which allows the basename to have full control over the presence of a
    // trailing slash on root links
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
const OutletContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/v6/hooks/use-outlet-context
 */
function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(OutletContext);
}

/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by `<Outlet>` to render child routes.
 *
 * @see https://reactrouter.com/v6/hooks/use-outlet
 */
function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext).outlet;
  if (outlet) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}

/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/v6/hooks/use-params
 */
function useParams() {
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}

/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/v6/hooks/use-resolved-path
 */
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getResolveToMatches)(matches, future.v7_relativeSplatPath));
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}

/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an `<Outlet>` to render their child route's
 * element.
 *
 * @see https://reactrouter.com/v6/hooks/use-routes
 */
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}

// Internal implementation with accept optional param for RouterProvider usage
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useRoutes() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (true) {
    // You won't get a warning about 2 different <Routes> under a <Route>
    // without a trailing *, but this is a best-effort warning anyway since we
    // cannot even give the warning unless they land at the parent route.
    //
    // Example:
    //
    // <Routes>
    //   {/* This route path MUST end with /* because otherwise
    //       it will never match /blog/post/123 */}
    //   <Route path="blog" element={<Blog />} />
    //   <Route path="blog/feed" element={<BlogFeed />} />
    // </Routes>
    //
    // function Blog() {
    //   return (
    //     <Routes>
    //       <Route path="post/:id" element={<Post />} />
    //     </Routes>
    //   );
    // }
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + (parentPath === "/" ? "*" : parentPath + "/*") + "\">."));
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, " + "the location pathname must begin with the portion of the URL pathname that was " + ("matched by all parent routes. The current pathname base is \"" + parentPathnameBase + "\" ") + ("but pathname \"" + parsedLocationArg.pathname + "\" was given in the `location` prop.")) : 0 : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    // Determine the remaining pathname by removing the # of URL segments the
    // parentPathnameBase has, instead of removing based on character count.
    // This is because we can't guarantee that incoming/outgoing encodings/
    // decodings will match exactly.
    // We decode paths before matching on a per-segment basis with
    // decodeURIComponent(), but we re-encode pathnames via `new URL()` so they
    // match what `window.location.pathname` would reflect.  Those don't 100%
    // align when it comes to encoded URI characters such as % and &.
    //
    // So we may end up with:
    //   pathname:           "/descendant/a%25b/match"
    //   parentPathnameBase: "/descendant/a%b"
    //
    // And the direct substring removal approach won't work :/
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes)(routes, {
    pathname: remainingPathname
  });
  if (true) {
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(parentRoute || matches != null, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ") : 0;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(matches == null || matches[matches.length - 1].route.element !== undefined || matches[matches.length - 1].route.Component !== undefined || matches[matches.length - 1].route.lazy !== undefined, "Matched leaf route at location \"" + location.pathname + location.search + location.hash + "\" " + "does not have an element or Component. This means it will render an <Outlet /> with a " + "null value by default resulting in an \"empty\" page.") : 0;
  }
  let renderedMatches = _renderMatches(matches && matches.map(match => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
  })), parentMatches, dataRouterState, future);

  // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.
  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse)(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  if (true) {
    console.error("Error handled by React Router default ErrorBoundary:", error);
    devInfo = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "ErrorBoundary"), " or", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "errorElement"), " prop on your route."));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }
  static getDerivedStateFromProps(props, state) {
    // When we get into an error state, the user will likely click "back" to the
    // previous page that didn't have an error. Because this wraps the entire
    // application, that will have no effect--the error page continues to display.
    // This gives us a mechanism to recover from the error when the location changes.
    //
    // Whether we're in an error state or not, we update the location in state
    // so that when we are in an error state, it gets reset when a new location
    // comes in and the user recovers from the error.
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }

    // If we're not changing locations, preserve the location but still surface
    // any new errors that may come through. We retain the existing error, we do
    // this because the error provided from the app state may be cleared without
    // the location changing.
    return {
      error: props.error !== undefined ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== undefined ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);

  // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      // Don't bail if we're initializing with partial hydration and we have
      // router matches.  That means we're actively running `patchRoutesOnNavigation`
      // so we should render down the partial matches to the appropriate
      // `HydrateFallback`.  We only do this if `parentMatches` is empty so it
      // only impacts the root matches for `RouterProvider` and no descendant
      // `<Routes>`
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;

  // If we have data errors, trim matches to the highest error boundary
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== undefined);
    !(errorIndex >= 0) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : 0 : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }

  // If we're in a partial hydration mode, detect if we need to render down to
  // a given HydrateFallback while we load the rest of the hydration data
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i = 0; i < renderedMatches.length; i++) {
      let match = renderedMatches[i];
      // Track the deepest fallback up until the first route without data
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === undefined && (!errors || errors[match.route.id] === undefined);
        if (match.route.lazy || needsToRunLoader) {
          // We found the first route that's not ready to render (waiting on
          // lazy, or has a loader that hasn't run yet).  Flag that we need to
          // render a fallback and render up until the appropriate fallback
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    // Only data routers handle errors/fallbacks
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : undefined;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        // Note: This is a de-optimized path since React won't re-use the
        // ReactElement since it's identity changes with each new
        // React.createElement call.  We keep this so folks can use
        // `<Route Component={...}>` in `<Routes>` but generally `Component`
        // usage is only advised in `RouterProvider` when we can convert it to
        // `element` ahead of time.
        children = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderedRoute, {
        match: match,
        routeContext: {
          outlet,
          matches,
          isDataRoute: dataRouterState != null
        },
        children: children
      });
    };
    // Only wrap in an error boundary within data router usages when we have an
    // ErrorBoundary/errorElement on this route.  Otherwise let it bubble up to
    // an ancestor ErrorBoundary/errorElement
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error: error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook = /*#__PURE__*/function (DataRouterHook) {
  DataRouterHook["UseBlocker"] = "useBlocker";
  DataRouterHook["UseRevalidator"] = "useRevalidator";
  DataRouterHook["UseNavigateStable"] = "useNavigate";
  return DataRouterHook;
}(DataRouterHook || {});
var DataRouterStateHook = /*#__PURE__*/function (DataRouterStateHook) {
  DataRouterStateHook["UseBlocker"] = "useBlocker";
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook["UseRouteId"] = "useRouteId";
  return DataRouterStateHook;
}(DataRouterStateHook || {});
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  !ctx ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  !state ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  !route ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return route;
}

// Internal version with hookName-aware debugging
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, hookName + " can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  return thisRoute.route.id;
}

/**
 * Returns the ID for the nearest contextual route
 */
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}

/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */
function useNavigation() {
  let state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}

/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  let state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  }), [dataRouterContext.router.revalidate, state.revalidation]);
}

/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => matches.map(m => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_convertRouteMatchToUiMatch)(m, loaderData)), [matches, loaderData]);
}

/**
 * Returns the loader data for the nearest ancestor Route loader
 */
function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return undefined;
  }
  return state.loaderData[routeId];
}

/**
 * Returns the loaderData for the given routeId
 */
function useRouteLoaderData(routeId) {
  let state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}

/**
 * Returns the action data for the nearest ancestor Route action
 */
function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  return state.actionData ? state.actionData[routeId] : undefined;
}

/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * ErrorBoundary/errorElement to display a proper error message.
 */
function useRouteError() {
  var _state$errors;
  let error = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);

  // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary
  if (error !== undefined) {
    return error;
  }

  // Otherwise look for errors from our data router state
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}

/**
 * Returns the happy-path data from the nearest ancestor `<Await />` value
 */
function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}

/**
 * Returns the error from the nearest ancestor `<Await />` value
 */
function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
let blockerId = 0;

/**
 * Allow the application to block navigations within the SPA and present the
 * user a confirmation dialog to confirm the navigation.  Mostly used to avoid
 * using half-filled form data.  This does not handle hard-reloads or
 * cross-origin navigations.
 */
function useBlocker(shouldBlock) {
  let {
    router,
    basename
  } = useDataRouterContext(DataRouterHook.UseBlocker);
  let state = useDataRouterState(DataRouterStateHook.UseBlocker);
  let [blockerKey, setBlockerKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState("");
  let blockerFunction = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(arg => {
    if (typeof shouldBlock !== "function") {
      return !!shouldBlock;
    }
    if (basename === "/") {
      return shouldBlock(arg);
    }

    // If they provided us a function and we've got an active basename, strip
    // it from the locations we expose to the user to match the behavior of
    // useLocation
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = arg;
    return shouldBlock({
      currentLocation: _extends({}, currentLocation, {
        pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(currentLocation.pathname, basename) || currentLocation.pathname
      }),
      nextLocation: _extends({}, nextLocation, {
        pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(nextLocation.pathname, basename) || nextLocation.pathname
      }),
      historyAction
    });
  }, [basename, shouldBlock]);

  // This effect is in charge of blocker key assignment and deletion (which is
  // tightly coupled to the key)
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let key = String(++blockerId);
    setBlockerKey(key);
    return () => router.deleteBlocker(key);
  }, [router]);

  // This effect handles assigning the blockerFunction.  This is to handle
  // unstable blocker function identities, and happens only after the prior
  // effect so we don't get an orphaned blockerFunction in the router with a
  // key of "".  Until then we just have the IDLE_BLOCKER.
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blockerKey !== "") {
      router.getBlocker(blockerKey, blockerFunction);
    }
  }, [router, blockerKey, blockerFunction]);

  // Prefer the blocker from `state` not `router.state` since DataRouterContext
  // is memoized so this ensures we update on blocker state updates
  return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.IDLE_BLOCKER;
}

/**
 * Stable version of useNavigate that is used when we are in the context of
 * a RouterProvider.
 */
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0;

    // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our router subscriber yet
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, message) : 0;
  }
}

const alreadyWarned = {};
function warnOnce(key, message) {
  if ( true && !alreadyWarned[message]) {
    alreadyWarned[message] = true;
    console.warn(message);
  }
}
const logDeprecation = (flag, msg, link) => warnOnce(flag, "\u26A0\uFE0F React Router Future Flag Warning: " + msg + ". " + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."));
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === undefined) {
    logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
  }
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === undefined && (!routerFuture || routerFuture.v7_relativeSplatPath === undefined)) {
    logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
  }
  if (routerFuture) {
    if (routerFuture.v7_fetcherPersist === undefined) {
      logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
    }
    if (routerFuture.v7_normalizeFormMethod === undefined) {
      logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
    }
    if (routerFuture.v7_partialHydration === undefined) {
      logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
    }
    if (routerFuture.v7_skipActionErrorRevalidation === undefined) {
      logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
    }
  }
}

/**
  Webpack + React 17 fails to compile on any of the following because webpack
  complains that `startTransition` doesn't exist in `React`:
  * import { startTransition } from "react"
  * import * as React from from "react";
    "startTransition" in React ? React.startTransition(() => setState()) : setState()
  * import * as React from from "react";
    "startTransition" in React ? React["startTransition"](() => setState()) : setState()

  Moving it to a constant such as the following solves the Webpack/React 17 issue:
  * import * as React from from "react";
    const START_TRANSITION = "startTransition";
    START_TRANSITION in React ? React[START_TRANSITION](() => setState()) : setState()

  However, that introduces webpack/terser minification issues in production builds
  in React 18 where minification/obfuscation ends up removing the call of
  React.startTransition entirely from the first half of the ternary.  Grabbing
  this exported reference once up front resolves that issue.

  See https://github.com/remix-run/react-router/issues/10579
*/
const START_TRANSITION = "startTransition";
const startTransitionImpl = react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION];

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future
  } = _ref;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    if (v7_startTransition && startTransitionImpl) {
      startTransitionImpl(() => setStateImpl(newState));
    } else {
      setStateImpl(newState);
    }
  }, [setStateImpl, v7_startTransition]);

  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(fallbackElement == null || !router.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using " + "`v7_partialHydration`, use a `HydrateFallback` component instead") : 0;
    // Only log this once on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => logV6DeprecationWarnings(future, router.future), [router, future]);

  // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator,
    future: {
      v7_relativeSplatPath: router.future.v7_relativeSplatPath
    }
  }, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRoutes, {
    routes: router.routes,
    future: router.future,
    state: state
  }) : fallbackElement))), null);
}
function DataRoutes(_ref2) {
  let {
    routes,
    future,
    state
  } = _ref2;
  return useRoutesImpl(routes, undefined, state, future);
}
/**
 * A `<Router>` that stores all entries in memory.
 *
 * @see https://reactrouter.com/v6/router-components/memory-router
 */
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex,
    future
  } = _ref3;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future: future
  });
}
/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/v6/components/navigate
 */
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of
  // the router loaded. We can help them understand how to avoid that.
  "<Navigate> may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    future,
    static: isStatic
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(!isStatic, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") : 0;
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();

  // Resolve the path outside of the effect so that when effects run twice in
  // StrictMode they navigate to the same place
  let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getResolveToMatches)(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/v6/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}
/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/v6/components/route
 */
function Route(_props) {
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "A <Route> is only ever to be used as the child of <Routes> element, " + "never rendered directly. Please wrap your <Route> in a <Routes>.") : 0 ;
}
/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a `<Router>` directly. Instead, you'll render a
 * router that is more specific to your environment such as a `<BrowserRouter>`
 * in web browsers or a `<StaticRouter>` for server rendering.
 *
 * @see https://reactrouter.com/v6/router-components/router
 */
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop,
    navigator,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "You cannot render a <Router> inside another <Router>." + " You should never have more than one in your app.") : 0 : void 0;

  // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    basename,
    navigator,
    static: staticProp,
    future: _extends({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let trailingPathname = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(locationContext != null, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash + "\" because it does not start with the ") + "basename, so the <Router> won't render anything.") : 0;
  if (locationContext == null) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
    children: children,
    value: locationContext
  }));
}
/**
 * A container for a nested tree of `<Route>` elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/v6/components/routes
 */
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus = /*#__PURE__*/function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
  return AwaitRenderStatus;
}(AwaitRenderStatus || {});
const neverSettledPromise = new Promise(() => {});
class AwaitErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }
  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;
    if (!(resolve instanceof Promise)) {
      // Didn't get a promise - provide as a resolved promise
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      // Caught a render error, provide it as a rejected promise
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {}); // Avoid unhandled rejection warnings
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      // Already tracked promise - check contents
      promise = resolve;
      status = "_error" in promise ? AwaitRenderStatus.error : "_data" in promise ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      // Raw (untracked) promise - track it
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then(data => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), error => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }
    if (status === AwaitRenderStatus.error && promise._error instanceof _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError) {
      // Freeze the UI by throwing a never resolved promise
      throw neverSettledPromise;
    }
    if (status === AwaitRenderStatus.error && !errorElement) {
      // No errorElement, throw to the nearest route-level error boundary
      throw promise._error;
    }
    if (status === AwaitRenderStatus.error) {
      // Render via our errorElement
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }
    if (status === AwaitRenderStatus.success) {
      // Render children with resolved value
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: children
      });
    }

    // Throw to the suspense boundary
    throw promise;
  }
}

/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on `<Await>`
 */
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8;
  let data = useAsyncValue();
  let toRender = typeof children === "function" ? children(data) : children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toRender);
}

///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/v6/utils/create-routes-from-children
 */
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (element, index) => {
    if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : 0 : void 0;
    !(!element.props.index || !element.props.children) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "An index route cannot have child routes.") : 0 : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}

/**
 * Renders the result of `matchRoutes()` into a React element.
 */
function renderMatches(matches) {
  return _renderMatches(matches);
}

function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (true) {
      if (route.element) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `Component` and `element` on your route - " + "`Component` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.Component),
      Component: undefined
    });
  }
  if (route.HydrateFallback) {
    if (true) {
      if (route.hydrateFallbackElement) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - " + "`HydrateFallback` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      hydrateFallbackElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.HydrateFallback),
      HydrateFallback: undefined
    });
  }
  if (route.ErrorBoundary) {
    if (true) {
      if (route.errorElement) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - " + "`ErrorBoundary` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      errorElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.ErrorBoundary),
      ErrorBoundary: undefined
    });
  }
  return updates;
}
function createMemoryRouter(routes, opts) {
  return (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes,
    mapRouteProperties,
    dataStrategy: opts == null ? void 0 : opts.dataStrategy,
    patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation
  }).initialize();
}


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./src/admin/dashboard.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "../plugin-slug/node_modules/react-dom/client.js");
/* harmony import */ var _dashboard_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.scss */ "./src/admin/dashboard.scss");
/* harmony import */ var _Components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/App */ "./src/admin/Components/App.js");
/* harmony import */ var _utils_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/data */ "./src/admin/utils/data.js");





document.addEventListener("DOMContentLoaded", () => {
  const dashboardEl = document.getElementById("vgbDashboard");
  const info = JSON.parse(dashboardEl.dataset.info);
  (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(dashboardEl).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...(0,_utils_data__WEBPACK_IMPORTED_MODULE_4__.dashboardInfo)(info)
  }));
  dashboardEl.removeAttribute("data-info");
});
})();

/******/ })()
;
//# sourceMappingURL=dashboard.js.map