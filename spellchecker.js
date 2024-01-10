#! /usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import { createSpinner } from 'nanospinner'
import boxen from 'boxen'
import { createSpellChecker } from './lib/spellingUtils.js'
import figlet from 'figlet'

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

const checkSpellingProgress = createSpinner('Checking spelling')
checkSpellingProgress.start()
await wait(1000)
const errors = spellChecker.checkSpelling(text)
checkSpellingProgress.success()

if (errors.length > 0) {
  console.log(chalk.red(`Found ${errors.length} errors`))
  console.log()
  errors.forEach((error) => {
    console.log(boxen(error.context, {padding: 1, title: error.word, borderColor: 'yellow'}))
    console.log(chalk.yellow(`Found at line ${error.line}, column ${error.column}`))
    console.log(`Suggestions: ${chalk.blue(error.suggestions.join(', '))}`)
    console.log()
  })
  process.exit(0)
}

console.log(chalk.green('No spelling errors found'))

figlet('Nice job!', (err, data) => {
  if (err) {
    console.log(chalk.red('Error rendering ASCII art'))
    process.exit(1)
  }
  console.log(chalk.green(data))
})


