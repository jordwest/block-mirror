.PHONY: install bundle block-page service-worker

build: target/manifest.json block-page service-worker

install:
	pnpm install

clean:
	rm -rf target
	rm -rf dist
	mkdir -p target

target/manifest.json: scripts/generate-manifest.ts package.json
	nix-shell -p deno --run 'deno run --allow-read scripts/generate-manifest.ts' > target/manifest.json

block-page:
	npx vite build packages/block-page
	cp dist/block-page/index.html target/block-page.html
	cp dist/block-page/block-page.js target/block-page.js
	cp dist/block-page/block-page.index.css target/block-page.index.css

service-worker:
	npx vite build packages/service-worker
	cp dist/service-worker/service-worker.js target/service-worker.js
	#npx rollup --config src/service-worker/rollup.config.mjs
	#cp dist/esm/service-worker.js target/service-worker.js
