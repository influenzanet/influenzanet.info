FROM node:16.13.0 as development-init

# COPY mininmal requiremente to run npm install
WORKDIR /app/
COPY ../../package.json /app/package.json
COPY ../../package-lock.json /app/package-lock.json
COPY ../../decorate-angular-cli.js /app/decorate-angular-cli.js

# Install
RUN npm ci
RUN npm install -g nx

# RUN app
CMD ["npm", "start"]
