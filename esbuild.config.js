const { build } = require("esbuild");

build({
	entryPoints: ["src/app.ts"],
	outfile: "dist/bundle.js",
	external: ["express", "cors", "pg", 'joi'],
	minify: true,
	bundle: true,
	sourcemap: true,
	target: ["ES6"],
}).catch(() => process.exit(1));

