# Services API Gateway

Api gateway for Eskrima Services. Intended for testing services that we build.

# Running
1. Create a local docker image of the gateway by running:

```bash
docker build -t eskrima/services-api-gateway:dev .
```

2. Make sure RabbitMQ docker container is running, then run:

```bash
docker-compose -f docker-compose-dev.yml up -d
```
