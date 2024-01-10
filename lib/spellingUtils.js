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
  const lines = text.split(/\r?\n/)
  const errors = []

  lines.forEach((line, lineIndex) => {
    // Split line into words, preserving whitespace
    const words = line.split(/(\s+)/).filter(Boolean)

    words.forEach((word, wordIndex) => {
      // Skip whitespace (including tabs
      if (!word.trim()) return

      const trimmedWord = trimPunctuation(word)
      const isProperNoun = trimmedWord[0] === trimmedWord[0].toUpperCase()
      const isMisspelled = !dictionary.has(trimmedWord.toLowerCase())

      if (isMisspelled && !isProperNoun) {
        errors.push({
          word,
          line: lineIndex,
          column: wordIndex,
        })
      }
    })
  })

  return errors
}

export function trimPunctuation(word) {
  // Remove punctuation from start and end of word
  return word.replace(/^\W+|\W+$/g, '')
}