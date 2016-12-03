IMAGE=wishlist2016-app
PORT=3000

.PHONY: run
run: build
	docker run --rm -it -v $(PWD)/src:/app/src --net=host --env-file=.env $(IMAGE)

.PHONY: build
build:
	docker build -t $(IMAGE) .
