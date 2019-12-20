# Mobistudy Web

This repository contains the frontend of the Mobistudy web server.
The frontend is developed as a single-page app using the [quasar framework](https://quasar-framework.org/).

## Pre requisites

You need to install the following on your system:

- nodejs
- (optional) the [quasar command line tool](https://quasar.dev/quasar-cli/installation)

Install all other dependencies with `npm install`.

## Run it

To start the interface, run `npm run dev` or, if you have installed the quasar cli, `quasar dev`.
You will need the MobistudyAPI running in parallel (see MobistudyAPI docs).

## Develop it

The code is written mostly in ES6 and uses ES6 modules, please be consistent.


## Deploy it

Run `quasar build`. This will generate the material UI interfaces and make it available under `./dist/`


## Docker

Build the docker instance:

    docker build -t mobistudyweb .

Then run it with:

    docker run -d -p 80:80 --name mobistudyweb mobistudyweb

This will launch an ngnix instance that serves the static content, but not the API.
You will need the API running as well!
