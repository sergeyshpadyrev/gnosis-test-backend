# Gnosis Test Backend

This is a backend for home-take assignment for Gnosis. <br/>
You can find the frontend [here](https://github.com/sergeyshpadyrev/gnosis-test-frontend).

## Architecture

This backend is a simple API server that uses [jsonbin.io](https://jsonbin.io) as a database. <br/>
It's built with `Nest.JS`. <br/>
For authentication, it uses `passport.js` and uses base64 encoded siwe message and signature as a token. <br/>
In the real application it would make sense to check the signed message only once and create an expiring JWT token for the user or at least put some expiration period to the siwe message itself. But for the sake of the assignment, I've just used the siwe message as a token.

It uses

## Installation

```sh
yar
```

## Configuration

Create `.env` file in the root of the project with a master key and bin ID from [jsonbin.io](https://jsonbin.io):

```
BIN_ID=...
BIN_KEY=...
ENV=local
```

You can use the secret keys I provided in the email.

## Running locally

```sh
yarn start
```
