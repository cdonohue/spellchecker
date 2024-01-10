import fs from 'fs'

export function loadDictionary(path) {
  return new Set(fs.readFileSync(path, 'utf8').split(/\r?\n/))
}

export function createSpellChecker(dictionaryPath) {
  const dictionary = loadDictionary(dictionaryPath)

  return {
    dictionaryWordCount: dictionary.size,
    checkSpelling(text) {
      return checkSpelling(text, dictionary)
    }
  }
}

export function checkSpelling(text, dictionary) {
  // TODO: implement this
}