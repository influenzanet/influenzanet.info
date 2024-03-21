FROM node:18.18.0-alpine as development-init

# COPY mininmal requiremente to run npm install
WORKDIR /app/
COPY ./apps/api/package.json /app/package.json
COPY ./apps/api/decorate-angular-cli.js /app/decorate-angular-cli.js

# Install system dependencies
RUN apk --no-cache add \
    python3 \
    make \
    g++

# Install
RUN npm install --legacy-peer-deps

RUN echo '#! /bin/sh' >> /bin/ll
RUN echo 'ls -halp'   >> /bin/ll
RUN chmod u+x /bin/ll

RUN echo '#! /bin/sh'                                                 >> /bin/migration
RUN echo 'export IS_CLI="true" && node /app/main.js migration:"$@"'    >> /bin/migration
RUN chmod u+x /bin/migration

