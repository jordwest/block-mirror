.PHONY: install generate-manifest build

build: clean generate-manifest

install:
	pnpm install

clean:
	rm -rf target
	mkdir -p target

generate-manifest:
	nix-shell -p deno --run 'deno run scripts/generate-manifest.ts' > target/manifest.json