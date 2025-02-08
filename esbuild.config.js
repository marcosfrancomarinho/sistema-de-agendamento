const { build } = require('esbuild');

build({
	entryPoints: ['src/app.ts'],
	outfile: 'dist/bundle.min.js',
	external: ['express', 'cors', 'pg', 'joi'],
	bundle: true,
	minify: true,
	format: 'cjs',
	sourcemap: true,
	target: ['ES6'],
}).catch(() => process.exit(1));
