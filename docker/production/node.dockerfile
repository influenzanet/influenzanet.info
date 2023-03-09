FROM node:16.13.0 as development-init

# COPY mininmal requiremente to run npm install
WORKDIR /app/
COPY ./apps/server/package.json /app/package.json
COPY ./apps/server/package-lock.json /app/package-lock.json
COPY ./apps/server/decorate-angular-cli.js /app/decorate-angular-cli.js

# Install
RUN npm ci

