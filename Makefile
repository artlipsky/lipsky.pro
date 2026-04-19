.PHONY: install dev build preview check clean reset

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

check:
	npx astro check

clean:
	rm -rf dist .astro

reset: clean
	rm -rf node_modules package-lock.json
	npm install
