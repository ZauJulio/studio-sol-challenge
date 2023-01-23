# Studio Sol Comunicação Challenge 2023/Jan

<p align="center">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql"/>
  <img src="https://img.shields.io/badge/Vitest-100000?style=for-the-badge&logo=Vitest&logoColor=white&labelColor=ADC484&color=6da13f"/>
  <img src="https://img.shields.io/badge/Esbuild-100000?style=for-the-badge&logo=esbuild&logoColor=white&labelColor=black&color=ffcf00"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/SonarQube-100000?style=for-the-badge&logo=Sonar&logoColor=white&labelColor=9699eA&color=8689DA"/>
</p>

<img src="https://i.imgur.com/25YMYht.png" width="300">
<img src="https://i.imgur.com/S5TFmLr.png" width="300">

This is the Studio Sol Comunicação Backend Challenge of 2023/01 project. The project consists of a password valider microservice, where the user sends a password and the rules that should be validated and the server returns whether the password is valid or not, and which rules have been broken.

## 📑 About the project

The server uses [Winston](https://github.com/winstonjs/winston) and the native debug for log and debug.Winston is a logger for node.js based on [log4J](https://logging.apache.org/log4J/2.x/).

The code written in TypeScript is transpilated to JavaScript using [Esbuild](https://esbuild.github.io/).Esbuild is an open source compiler that is faster than Babel.Written in GO, [tsx](https://github.com/esbuild-kit/tsx) was used for project automatic build.In addition, the [tsup](https://tsup.egoist.dev/) for server bundle, which is faster than [tsc](https://www.typescriptlang.org/docs/handbook/compilers-Options.html).

For communication, [Express](https://expressjs.com/en-br/) has been selected for being a lightweight, easy-to-use framework. In addition, [Apollo Server](https://www.apollographql.com/docs/apollo-server/) was used to create the graphql server. With adding a Rate Limit Middleware layer for the routes [Express-rate-limit](https://github.com/express-limit/express-limit) and [Cors](https://github.com/expressjs/cors).

Finally, for unit tests the [Vitest](https://vitest.dev/) was the framework responsible for unit tests performed.Vost is a unit test framework for Node.js and browsers, which is faster than the Jest and the Mocha.

## 📦 Dependencies

- Server:

  - Express
  - Express-rate-limit
  - Express-winston
  - @Apollo-server
  - Graphql

- Run, Build and Test:

  - Tsx
  - Tsup
  - Vitest

- Base:
  - Cors
  - Debug
  - Dotenv
  - Eslint
  - Prettier
  - Typescript

## Package Manager 📦

The project was developed using [PNPM](https://pnpm.io/), but you can use any of the package managers below:

- [NPM](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)
- [PNPM](https://pnpm.io/)

## 🚀 Getting Started

Start by defining the environment variables:

### Environment Variables

- NODE_ENV=development
- PORT=3000

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Running with docker 🐋

Just run:

```bash
docker-compose up -d
```

## Usage 🔴

### GraphQL Playground

```bash
http://localhost:8080/graphql
```

### GraphQL Query

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
http://localhost:8080/api
```

### REST Query

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

## 📝 Tests

```bash
npm run test
```

## 📝 SonarQube

```bash
npm run sonar
```

## 📝 License

This project is under the MIT license.

<p align="center">
  <strong> Maded with 💜 by: </strong>
  <p align="center">
    <a href="https://github.com/ZauJulio">
      <img src="https://github.com/ZauJulio.png" width="50" height="50" alt="OakAnderson" />
    </a>
  </p>
</p>
