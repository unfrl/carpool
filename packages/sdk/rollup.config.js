import rollup from "rollup";
import nodeResolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";

/**
 * @type {rollup.RollupFileOptions}
 */
const config = {
  input: "./esm/carpoolAPI.js",
  external: ["@azure/core-http", "@azure/core-arm"],
  output: {
    file: "./dist/carpool-sdk.js",
    format: "umd",
    name: "Unfrl.CarpoolSdk",
    sourcemap: true,
    globals: {
      "@azure/core-http": "coreHttp",
      "@azure/core-arm": "coreArm",
    },
    banner: "",
  },
  plugins: [nodeResolve({ module: true }), sourcemaps()],
};

export default config;
