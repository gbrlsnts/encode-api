## Description

The encode api is based on NestJS and its purpose is to encode any media file to a desired format.

This api receives inputs from the user and will queue them, so workers can process and create the desired output. An input file can have multiple outputs (e.g. convert a video do 1080p and a second version in 720p)

This is an hobby project which I decided to turn public and will be working when I have free time, so don't expect it to be near production-ready (yet).

While I'm not happy with the end result, all development will be on master only.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE).
