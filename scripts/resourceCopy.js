#! /usr/bin/env node

const exec = require('child_process').execSync
const path = require('path')
const fs = require('fs')

const resources = [
]

resources.forEach(res => {
  const copyTo = path.join('./public', res.to)
  if(!fs.existsSync(copyTo)) {
    fs.mkdirSync(copyTo)
  }
  exec(`cp -R ${res.from} ${copyTo}`)
})
