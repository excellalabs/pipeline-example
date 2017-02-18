#! /usr/bin/env node

const notifier = require('node-notifier');
const path = require('path')

let file = process.argv[2]

if(!file){
  console.error('Please supply a filename as an argument')
  process.exit(1)
}

file = path.relative(path.join(__dirname, '..'), file)

notifier.notify({
  title: 'nodemon',
  message: `App restarted due to:\n${file}`
});
