# Services API Gateway

Api gateway for Eskrima Services. Intended for testing services that we build.

## Running
1. Create a local docker image of the gateway by running:

```bash
docker build -t eskrima/services-api-gateway:dev .
```

2. Make sure RabbitMQ docker container is running, then run:

```bash
docker-compose -f docker-compose-dev.yml up -d
```

## Interactive API Documentation

This API gateway comes with automated documentation for every route that will be added to the gateway. To view interactive documentation, follow these instructions:

1. Make sure that the API gateway docker container is up by running `docker ps -a`.
2. Assuming your using boot2docker to run docker, check you boot2docker IP by running `boot2docker ip`.
3. Point you browser to your boot2docker IP at port `8005` then browse to `/documentation` route (e.g. `192.168.59.103:8005/documentation`).
