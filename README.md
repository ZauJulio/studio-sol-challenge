<h1>Studio Sol Comunicaรงรฃo Challenge 2023/Jan</h1>

<p align="center">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/Esbuild-100000?style=for-the-badge&logo=esbuild&logoColor=white&labelColor=black&color=ffcf00"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/49128655/215944688-d8aa2e16-3a11-4160-807f-678707961e60.png">
</p>

- [๐ About the project](#-about-the-project)
- [๐ฆ Dependencies](#-dependencies)
- [๐ฅ Package Manager](#-package-manager)
- [๐ Project Structure](#-project-structure)
- [๐ Getting Started](#-getting-started)
  - [Environment Variables](#environment-variables)
  - [Install](#install)
  - [Run](#run)
  - [Running with docker ๐](#running-with-docker-)
- [Usage ๐ด](#usage-)
  - [GraphQL API](#graphql-api)
  - [REST API](#rest-api)
- [โ Tests](#-tests)
- [๐ SonarQube](#-sonarqube)
- [๐ Docs](#-docs)
- [๐ License](#-license)


This is the Studio Sol Comunicaรงรฃo Backend Challenge of 2023/01 project. The project consists of a password valider microservice, where the user sends a password and the rules that should be validated and the server returns whether the password is valid or not, and which rules have been broken.

## ๐ About the project

The server uses [Winston](https://github.com/winstonjs/winston) and the native debug for log and debug.Winston is a logger for Node.js based on [log4J](https://logging.apache.org/log4J/2.x/).

The code written in TypeScript is transpilated to JavaScript using [Esbuild](https://esbuild.github.io/). Esbuild is an open source compiler that is faster than Babel. Written in GO, [tsx](https://github.com/esbuild-kit/tsx) was used for project automatic build.In addition, the [tsup](https://tsup.egoist.dev/) for server bundle, which is faster than [tsc](https://www.typescriptlang.org/docs/handbook/compilers-Options.html).

For communication, [Express](https://expressjs.com/en-br/) has been selected for being a lightweight, easy-to-use framework. In addition, [Apollo Server](https://www.apollographql.com/docs/apollo-server/) was used to create the graphql server. With adding a Rate Limit Middleware layer for the routes [Express-rate-limit](https://github.com/express-limit/express-limit) and [Cors](https://github.com/expressjs/cors).

Finally, for unit tests the [Jest](https://jestjs.io/) was the framework responsible for unit tests performed. In addition, the [supertest](https://github.com/ladjs/supertest) was used to test the routes with integration tests.

## ๐ฆ Dependencies

- Server:

  - Express
  - Express-rate-limit
  - Express-winston
  - @Apollo-server
  - Graphql

- Run, Build and Test:

  - Tsx - Esbuild
  - Tsup - Esbuild
  - Jest

- Base:
  - Cors
  - Debug
  - Dotenv
  - Eslint
  - Prettier
  - Typescript

## ๐ฅ Package Manager

The project was developed using [PNPM](https://pnpm.io/), but you can use any of the package managers below:

- [NPM](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)
- [PNPM](https://pnpm.io/)

## ๐ Project Structure

the root directory is src/ and contains the following files:

```bash
-> Middlewares         # Validations, authentication, sanitization, etc.
  -> Controllers       # Endpoints, dice, etc.
    -> Services        # Business rules, logic, etc.
```

```bash
โโโ __tests__/        # Integration tests
โโโ common/           # Common: general project core files
โ   โโโ config/         # Config files, like env variables
โ   โโโ constants/      # Constants files, like enums
โ   โโโ interfaces/     # Interfaces files
โ   โโโ types/          # Types files
โ   โโโ utils/          # Utility files, like rules, logger, etc
โโโ modules/          # Modules: main fragments of the project
โ   โโโ Verify/
โ       โโโ graphql/              # GraphQl files of module
โ       โโโ verify.controller.ts  # Controller with the endpoints
โ       โโโ verify.middleware.ts  # Middleware with the handlers
โ       โโโ verify.service.ts     # Service with the main business 
โ       โโโ __tests__/  # Unit tests of module
โโ app.controller.ts    # Controller file with all endpoints
โโ app.middleware.ts    # Middleware file with general handlers
โโ app.service.ts       # General services, like docs, static files...
โโ main.ts              # Bootstrap the application
```

## ๐ Getting Started

Start by defining the environment variables:

### Environment Variables

- PORT=3000

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Running with docker ๐

Just run:

```bash
docker-compose up -d
```

## Usage ๐ด

### GraphQL API

```bash
http://localhost:8080/graphql
```

- GraphQL Query

```graphql
query {
  verify(
    password: "TesteSenhaForte!123&"
    rules: [
      { rule: "minSize", value: 8 }
      { rule: "minSpecialChars", value: 3 }
      { rule: "noRepeted", value: 0 }
      { rule: "minDigit", value: 4 }
    ]
  ) {
    verify
    noMatch
  }
}
```

### REST API

```bash
http://localhost:8080/verify
```

- REST Query

```json
{
  "password": "TesteSenhaForte!123&",
  "rules": [
    {
      "rule": "minDigit",
      "value": 8
    },
    {
      "rule": "minSpecialChars",
      "value": 3
    }
  ]
}
```

## โ Tests

```bash
npm run test

# And use test:watch for watch mode
npm run test:watch

# And use test:coverage for generate coverage report
npm run test:coverage
```

## ๐ SonarQube

```bash
npm run sonar
```

## ๐ Docs

The REST API documentation is based on Openapi/Swagger is available at:

[http://localhost:8080/docs](http://localhost:8080/docs)

And the graphql API documentation is available at:

[http://localhost:8080/graphql](http://localhost:8080/docs/graphql)

To update the Graphql API just run the command:

```bash
npm run docs:gen
```

For now it is necessary to write the Documentation of the REST API manually, but will soon be generated automatically.

## ๐ License

This project is under the MIT license.

<p align="center">
  <strong> Maded with ๐ by: </strong>
  <p align="center">
    <a href="https://github.com/ZauJulio">
      <img src="https://github.com/ZauJulio.png" width="50" height="50" alt="OakAnderson" />
    </a>
  </p>
</p>
````
