#! /usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { createSpellChecker } from './lib/spellingUtils.js'

const dictionaryPath = process.argv[2]
const textFilePath = process.argv[3]

if (!dictionaryPath || !textFilePath) {
  console.log(chalk.red('Please provide a dictionary and a text file'))
  process.exit(1)
}

const spellChecker = createSpellChecker(dictionaryPath)

