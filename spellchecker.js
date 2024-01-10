#! /usr/bin/env node

import fs from 'fs'

const dictionaryPath = process.argv[2]
const textFilePath = process.argv[3]

if (!dictionaryPath || !textFilePath) {
  console.log('Please provide a dictionary and a text file')
  process.exit(1)
}