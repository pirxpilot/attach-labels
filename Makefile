PROJECT=attach-labels
NODE_BIN=./node_modules/.bin
SRC = index.js $(wildcard lib/*.js)

check: lint test

compile: build/build.js

node_modules: package.json
	yarn
	touch $@

lint: | node_modules
	$(NODE_BIN)/biome ci

format: | node_modules
	$(NODE_BIN)/biome check --fix

test:
	node --test

clean:
	rm -fr node_modules

.PHONY: clean check format lint test
