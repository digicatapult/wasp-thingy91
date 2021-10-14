# wasp-thingy91
Uses [`wasp-payload-processor`](https://github.com/digicatapult/wasp-payload-processor) to build a payload parsing service for Thingy91 devices.

[Examples](https://github.com/nRFCloud/application-protocols) of Thingy91 payloads received from [Nordic Cloud](https://nrfcloud.com/) supplied MQTT broker. See [app/server.js](app/server.js) for how this service processes payloads.

## Getting started

`wasp-thingy91` can be run in a similar way to most nodejs applications. First install required dependencies using `npm`:

```sh
npm install
```

### Testing
For integration testing, `wasp-thingy91` depends on Kafka and Zookeeper. These can be brought locally up using docker:

```sh
docker-compose up -d
```

You can then run tests with:

```sh
npm test
```

## Environment Variables

`wasp-thingy91` is configured primarily using environment variables as follows:

| variable                    | required |        default        | description                                                                          |
| :-------------------------- | :------: | :-------------------: | :----------------------------------------------------------------------------------- |
| WASP_SENSOR_TYPE            |    N     |       `thingy91`      | Type of this sensor/thing for `wasp-thing-service`                                   |


The following environment variables configure the use of [`wasp-payload-processor`](https://github.com/digicatapult/wasp-payload-processor):

| variable                    | required |     default     | description                                                                             |
| :-------------------------- | :------: | :-------------: | :-------------------------------------------------------------------------------------- |
| PORT                        |    N     |      `3000`     | Port on which the service will listen                                                   |
| LOG_LEVEL                   |    N     |      `info`     | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]    |
| KAFKA_LOG_LEVEL             |    N     |    `nothing`    | Logging level for Kafka. Valid values are [`debug`, `info`, `warn`, `error`, `nothing`] |
| KAFKA_BROKERS               |    N     | `localhost:9092`| List of addresses for the Kafka brokers                                                 |
| KAFKA_READINGS_TOPIC        |    N     |   `readings`    | Outgoing Kafka topic for readings                                                       |
| KAFKA_EVENTS_TOPIC          |    N     |    `events`     | Outgoing Kafka topic for events                                                         |
| KAFKA_PAYLOAD_ROUTING_PREFIX|    N     |   `payloads`    | Prefix for incoming Kafka topics for payloads                                           |


## Helm/Kubernetes

Install `minikube` and `helm` using Homebrew, then start `minikube` and update helm dependencies:
```
brew install minikube helm
minikube start
helm dependency update helm/wasp-thingy91
```

Eval is required to provide helm with visibility for your local docker image repository:
```
eval $(minikube docker-env)
```

Build the docker image (change `src=` to point to your local github token):
```
DOCKER_BUILDKIT=1 docker build -t wasp-thingy91:latest --secret id=github,src=<path/to/your/github_token> .
```

To run/deploy the application on kubernetes via helm charts use the following `ct-values.yaml` with the corresponding overrides:
```
helm install wasp-thingy91 helm/wasp-thingy91 -f helm/wasp-thingy91/ci/ct-values.yaml
```

Check the pods are running successfully using:
```
kubectl get pods -A
```
