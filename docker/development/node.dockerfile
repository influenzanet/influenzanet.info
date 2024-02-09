FROM node:18.16.0-alpine as development-init

# COPY mininmal requiremente to run npm install
WORKDIR /app/

COPY ./package.json /app/package.json
COPY ./package-lock.json[t] /app/package-lock.json
COPY ./decorate-angular-cli.js /app/decorate-angular-cli.js

# Install system dependencies
RUN apk add \
    python3 \
    make \
    g++

# Install
RUN npm install --legacy-peer-deps
RUN npm install -g nx --legacy-peer-deps


RUN echo '#! /bin/sh' >> /bin/ll
RUN echo 'ls -halp'   >> /bin/ll
RUN chmod u+x /bin/ll

RUN echo '#! /bin/sh'                                                                     >> /bin/migration
RUN echo 'export IS_CLI="true" NODE_ENV="development" && node /app/dist/apps/api/main.js migration:"$@"'     >> /bin/migration
RUN chmod u+x /bin/migration

# RUN app
cmd ["npm", "-start"]



