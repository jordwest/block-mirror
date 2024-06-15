import withSolid from "rollup-preset-solid";

const config = withSolid(
    { input: "src/service-worker/service-worker.ts", targets: ["esm"] }
);

export default config;