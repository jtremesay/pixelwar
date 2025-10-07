IMAGE_NAME := killruana/pixelwar
IMAGE_TAG := $(IMAGE_NAME):latest

all: run_image

run_image: build_image
	docker run --rm -it -p 8001:8000 -e SECRET_KEY=django-insecure-dev $(IMAGE_TAG)

build_image:
	docker build -t $(IMAGE_TAG) .

.PHONY: all run_image build_image