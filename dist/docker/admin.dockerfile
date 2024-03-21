FROM node:18.18.0-alpine as development-init

# COPY mininmal requiremente to run npm install
WORKDIR /app/
COPY ./apps/admin/package.json /app/package.json
COPY ./apps/admin/decorate-angular-cli.js /app/decorate-angular-cli.js

# Install system dependencies
RUN apk --no-cache add \
    python3 \
    make \
    g++

# Install
RUN npm install --legacy-peer-deps

