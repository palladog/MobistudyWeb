Mobistudy Web
=============

Thsi repository contains the frontend of the Mobistudy web server.
The frontend is developed as a single-page app using the [quasar framework](https://quasar-framework.org/).

## Develop

Install nodejs, the [quasar command line tool](https://quasar-framework.org/guide/quasar-cli.html), then run `npm install`.

To start the interface, run `quasar dev`.
You will need the MobistudyAPI running in parallel (see MobistudyAPI docs).

## Deploy

Run `quasar build`. This will generate the material UI interfaces and make it available under `./dist/`
