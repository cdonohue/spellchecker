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
    let columnIndex = 0

    words.forEach((word) => {
      // Skip whitespace but increment the column count
      if (!word.trim()) {
        columnIndex += 1
        return
      }

      const trimmedWord = trimPunctuation(word)
      const isProperNoun = trimmedWord[0] === trimmedWord[0].toUpperCase()
      const isMisspelled = !dictionary.has(trimmedWord.toLowerCase())

      if (isMisspelled && !isProperNoun) {
        errors.push({
          word,
          line: lineIndex + 1,
          column: columnIndex + 1,
        })
      }

      columnIndex += word.length
    })
  })

  return errors
}

export function trimPunctuation(word) {
  // Remove punctuation from start and end of word
  return word.replace(/^\W+|\W+$/g, '')
}