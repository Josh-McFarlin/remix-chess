var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// <stdin>
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// src/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/Users/joshmcfarlin/Code/Web/remix-chess/src/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links
});
var import_remix2 = __toModule(require("remix"));

// src/styles/global.css
var global_default = "/build/_assets/global-4MW7DZR4.css";

// src/styles/dark.css
var dark_default = "/build/_assets/dark-APYDFYJA.css";

// route-module:/Users/joshmcfarlin/Code/Web/remix-chess/src/root.tsx
var links = () => {
  return [
    { rel: "stylesheet", href: global_default },
    {
      rel: "stylesheet",
      href: dark_default,
      media: "(prefers-color-scheme: dark)"
    }
  ];
};
function RemixLogo() {
  return /* @__PURE__ */ React.createElement("svg", {
    viewBox: "0 0 659 165",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    "aria-labelledby": "remix-run-logo-title",
    role: "img",
    width: "106",
    height: "30",
    fill: "currentColor"
  }, /* @__PURE__ */ React.createElement("title", {
    id: "remix-run-logo-title"
  }, "Remix Logo"), /* @__PURE__ */ React.createElement("path", {
    d: "M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z"
  }));
}
function Document({
  children,
  title
}) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement(import_remix2.Meta, null), /* @__PURE__ */ React.createElement(import_remix2.Links, null)), /* @__PURE__ */ React.createElement("body", null, children, /* @__PURE__ */ React.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix2.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React.createElement(import_remix2.LiveReload, null)));
}
function Layout({ children }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix-app"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "remix-app__header"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container remix-app__header-content"
  }, /* @__PURE__ */ React.createElement(import_remix2.Link, {
    to: "/",
    title: "Remix",
    className: "remix-app__header-home-link"
  }, /* @__PURE__ */ React.createElement(RemixLogo, null)), /* @__PURE__ */ React.createElement("nav", {
    "aria-label": "Main navigation",
    className: "remix-app__header-nav"
  }, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix2.Link, {
    to: "/"
  }, "Home")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
    href: "https://remix.run/docs"
  }, "Remix Docs")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/remix-run/remix"
  }, "GitHub")))))), /* @__PURE__ */ React.createElement("div", {
    className: "remix-app__main"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container remix-app__main-content"
  }, children)), /* @__PURE__ */ React.createElement("footer", {
    className: "remix-app__footer"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container remix-app__footer-content"
  }, /* @__PURE__ */ React.createElement("p", null, "\xA9 You!"))));
}
function App() {
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(import_remix2.Outlet, null)));
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(Document, {
    title: "Error!"
  }, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "There was an error"), /* @__PURE__ */ React.createElement("p", null, error.message), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("p", null, "Hey, developer, you should replace this with what you want your users to see."))));
}
function CatchBoundary() {
  const caught = (0, import_remix2.useCatch)();
  let message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ React.createElement("p", null, "Oops! Looks like you tried to visit a page that you do not have access to.");
      break;
    case 404:
      message = /* @__PURE__ */ React.createElement("p", null, "Oops! Looks like you tried to visit a page that does not exist.");
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ React.createElement(Document, {
    title: `${caught.status} ${caught.statusText}`
  }, /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement("h1", null, caught.status, ": ", caught.statusText), message));
}

// route-module:/Users/joshmcfarlin/Code/Web/remix-chess/src/routes/piece/$coordinate.ts
var coordinate_exports = {};
__export(coordinate_exports, {
  loader: () => loader
});

// src/utils/chess.ts
var import_js_chess_engine = __toModule(require("js-chess-engine"));
var import_flat_cache = __toModule(require("flat-cache"));
var import_merge_images = __toModule(require("merge-images"));
var import_canvas = __toModule(require("canvas"));
var imagePath = "../assets/chess";
var piecesToImages = {
  P: "w_pawn.png",
  N: "w_knight.png",
  B: "w_bishop.png",
  R: "w_rook.png",
  Q: "w_queen.png",
  K: "w_king.png",
  p: "b_pawn.png",
  n: "b_knight.png",
  b: "b_bishop.png",
  r: "b_rook.png",
  q: "b_queen.png",
  k: "b_king.png"
};
var lightSquare = "square_brown_light.png";
var darkSquare = "square_brown_dark.png";
var pendingMove = "blue_glow.png";
var aiLevel = 1;
var gameKey = "GAME";
var selKey = "SELECTED";
var _cache, _game;
var Game = class {
  constructor(gameId) {
    __privateAdd(this, _cache, void 0);
    __privateAdd(this, _game, void 0);
    this.gameId = gameId;
    __privateSet(this, _cache, import_flat_cache.default.load(gameId));
    const storedGame = __privateGet(this, _cache).getKey(gameKey);
    if (storedGame != null) {
      __privateSet(this, _game, new import_js_chess_engine.default.Game(storedGame));
      this.selectedPiece = __privateGet(this, _cache).getKey(selKey) || null;
    } else {
      __privateSet(this, _game, new import_js_chess_engine.default.Game());
      this.selectedPiece = null;
    }
  }
  select(coordinate) {
    this.selectedPiece = coordinate;
    const json = __privateGet(this, _game).exportJson();
    __privateGet(this, _cache).setKey(gameKey, json);
    __privateGet(this, _cache).setKey(selKey, this.selectedPiece);
    __privateGet(this, _cache).save();
    return json;
  }
  move(to) {
    if (this.selectedPiece == null) {
      throw new Error("Please select a game piece first!");
    }
    __privateGet(this, _game).move(this.selectedPiece, to);
    __privateGet(this, _game).aiMove(aiLevel);
    const json = __privateGet(this, _game).exportJson();
    __privateGet(this, _cache).setKey(gameKey, json);
    this.selectedPiece = null;
    __privateGet(this, _cache).setKey(selKey, null);
    __privateGet(this, _cache).save();
    return __privateGet(this, _game).exportJson();
  }
  state() {
    return __privateGet(this, _game).exportJson();
  }
};
_cache = new WeakMap();
_game = new WeakMap();
var loadedGames = new Map();
var createGame = (gameId) => {
  const game = new Game(gameId);
  loadedGames.set(gameId, game);
  return game;
};
var loadGame = (gameId) => {
  if (loadedGames.has(gameId)) {
    const game = loadedGames.get(gameId);
    if (game == null) {
      return createGame(gameId);
    }
    return game;
  } else {
    return createGame(gameId);
  }
};
var isSquareLight = (coordinate) => {
  const ascii = coordinate.charCodeAt(0);
  const num = parseInt(coordinate.charAt(1));
  return (ascii + num) % 2 !== 0;
};
var getGamePiece = async (gameId, coordinate) => {
  if (!gameId || !coordinate) {
    throw new Error("Invalid parameters!");
  }
  const game = loadGame(gameId);
  const images = [
    isSquareLight(coordinate) ? lightSquare : darkSquare
  ];
  const { pieces } = game.state();
  if (Object.prototype.hasOwnProperty.call(pieces, coordinate)) {
    images.push(piecesToImages[pieces[coordinate]]);
  }
  if (game.selectedPiece === coordinate) {
    images.push(pendingMove);
  }
  console.log("images", images);
  return (0, import_merge_images.default)(images.map((i) => imagePath + "/" + i), {
    Canvas: import_canvas.Canvas,
    Image: import_canvas.Image
  });
};

// route-module:/Users/joshmcfarlin/Code/Web/remix-chess/src/routes/piece/$coordinate.ts
var loader = async ({
  params,
  request
}) => {
  const gameId = request.headers.get("x-forwarded-for") || "GENERAL";
  const { coordinate } = params;
  if (!gameId || !coordinate) {
    return new Response("Please provide all parameters!", {
      status: 500
    });
  }
  try {
    const upperCoord = coordinate.toUpperCase();
    const piece = await getGamePiece(gameId, upperCoord);
    const img = Buffer.from(piece, "base64");
    return new Response(img, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": img.length.toString()
      }
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed!", {
      status: 500
    });
  }
};

// route-module:/Users/joshmcfarlin/Code/Web/remix-chess/src/routes/move/$coordinate.ts
var coordinate_exports2 = {};
__export(coordinate_exports2, {
  loader: () => loader2
});
var loader2 = async ({
  params,
  request
}) => {
  const gameId = request.headers.get("x-forwarded-for") || "GENERAL";
  const { coordinate } = params;
  if (!gameId || !coordinate) {
    return new Response("Please provide all parameters!", {
      status: 500
    });
  }
  try {
    const upperCoord = coordinate.toUpperCase();
    const game = loadGame(gameId);
    const state = game.selectedPiece == null ? game.select(upperCoord) : game.move(upperCoord);
    const stateStr = JSON.stringify(state, null, 2);
    return new Response(stateStr, {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed!", {
      status: 500
    });
  }
};

// route-module:/Users/joshmcfarlin/Code/Web/remix-chess/src/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default,
  meta: () => meta
});
var import_react = __toModule(require("react"));
var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
var nums = [1, 2, 3, 4, 5, 6, 7, 8];
var meta = () => {
  return {
    title: "Remix Chess",
    description: "Welcome to Remix Chess!"
  };
};
var IndexRoute = () => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ import_react.default.createElement("main", null, nums.reverse().map((number) => /* @__PURE__ */ import_react.default.createElement("div", {
    key: number
  }, letters.map((letter) => /* @__PURE__ */ import_react.default.createElement("a", {
    key: number + letter,
    href: `/move/${letter}${number}`
  }, /* @__PURE__ */ import_react.default.createElement("img", {
    src: `/piece/${letter}${number}`,
    alt: `Chess piece: ${letter}${number}`
  })))))));
};
var routes_default = IndexRoute;

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/piece/$coordinate": {
    id: "routes/piece/$coordinate",
    parentId: "root",
    path: "piece/:coordinate",
    index: void 0,
    caseSensitive: void 0,
    module: coordinate_exports
  },
  "routes/move/$coordinate": {
    id: "routes/move/$coordinate",
    parentId: "root",
    path: "move/:coordinate",
    index: void 0,
    caseSensitive: void 0,
    module: coordinate_exports2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
