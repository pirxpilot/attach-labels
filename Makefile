NODE_BIN=./node_modules/.bin

check: lint test

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
