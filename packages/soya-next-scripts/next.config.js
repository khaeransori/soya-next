const { join } = require("path");
const plugins = require("./plugins");
const config = require("config");

module.exports = plugins({
  assetPrefix: config.assetPrefix,
  distDir: config.distDir,
  configOrigin: config.configOrigin,
  useFileSystemPublicRoutes: config.useFileSystemPublicRoutes,
  webpack(config, options) {
    const soyaNextScriptsNodeModules = join(__dirname, "node_modules");
    config.resolve.modules.unshift(soyaNextScriptsNodeModules);
    config.resolveLoader.modules.unshift(soyaNextScriptsNodeModules);
    delete config.resolve.alias.react;
    delete config.resolve.alias["react-dom"];
    config.resolve.alias.react$ = options.dev
      ? "react/cjs/react.development.js"
      : "react/cjs/react.production.min.js";
    config.resolve.alias["react-dom$"] = options.dev
      ? "react-dom/cjs/react-dom.development.js"
      : "react-dom/cjs/react-dom.production.min.js";
    return config;
  }
});
