IMAGE=wishlist2016-app
PORT=3000

.PHONY: run
run: build
	docker run --rm -it -v $(PWD)/src:/app/src -p $(PORT):3000 $(IMAGE)

.PHONY: build
build:
	docker build -t $(IMAGE) .

.PHONY: sh
sh: build
	docker run --rm -it -v $(PWD)/src:/app/src -p $(PORT):3000 $(IMAGE) bash
