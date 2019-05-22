FROM node:11.12-alpine  as build

RUN npm install -g quasar-cli

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package* /usr/src/app/

RUN npm install
# RUN npm ci --only=production

COPY . /usr/src/app

RUN quasar build

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/spa-mat /usr/share/nginx/html
