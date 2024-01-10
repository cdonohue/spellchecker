#! /usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { createSpinner } from 'nanospinner'
import { createSpellChecker } from './lib/spellingUtils.js'

const dictionaryPath = process.argv[2]
const textFilePath = process.argv[3]

if (!dictionaryPath || !textFilePath) {
  console.log(chalk.red('Please provide a dictionary and a text file'))
  process.exit(1)
}

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

const spellChecker = createSpellChecker(dictionaryPath)

const dictionaryProgress = createSpinner(`Loading ${spellChecker.dictionaryWordCount} words from dictionary`)
dictionaryProgress.start()
await wait(1000)
dictionaryProgress.success()

const textFileProgress = createSpinner('Reading text file')
const text = fs.readFileSync(textFilePath, 'utf8')
textFileProgress.start()
await wait(1000)
textFileProgress.success()




