# syntax=docker/dockerfile:1.0.0-experimental

FROM node:14.16.0-alpine

# Allow log level to be controlled. Uses an argument name that is different
# from the existing environment variable, otherwise the environment variable
# shadows the argument.
ARG LOGLEVEL
ENV NPM_CONFIG_LOGLEVEL ${LOGLEVEL}

WORKDIR /wasp-thingy91

# Install base dependencies
COPY . .
RUN --mount=type=secret,id=github GITHUB_PACKAGE_TOKEN=$(cat /run/secrets/github) npm install --production


EXPOSE 80
CMD ["node", "./app/index.js"]
