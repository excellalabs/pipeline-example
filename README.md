# Pipeline Example [![Codeship](https://codeship.com/projects/afc02b10-d819-0134-421a-5ea80f2ec735/status?branch=master)](https://app.codeship.com/projects/203163)

#### [Url on Heroku](https://playground-prod.herokuapp.com/)

## Prerequisites
These are the things you will need to install before you can build or run the application:
* [node.js](https://nodejs.org/en/) (LTS version is recommended)
* Look at the prerequisites for [node-gyp](https://github.com/nodejs/node-gyp#installation) under the "You will also need to install:" heading for your operating system

## Getting started
After cloning the repository, run the following commands:
* `npm install` -- this will install the app's dependencies
* `npm run dev` -- this will bundle everything, watch all typescript and sass files, start the server, and open your default browser to the app

## Before submitting a Pull Request
These are the steps that the CI server will run to check your code before you will be allowed to merge:
* `npm run lint`
* `npm run test`

If you have any snapshot tests failing, use the following command to regenerate all snapshots:
* `npm run test:regenerate`
