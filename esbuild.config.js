const { build } = require("esbuild");

build({
	entryPoints: ["src/app.ts"],
	outfile: "dist/bundle.js",
	external: ["express", "cors", "pg"],
	minify: true,
	bundle: true,
	target: ["es6"],
});
