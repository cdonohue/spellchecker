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

    words.forEach((word, wordIndex) => {
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
          context: getWordContext(words, wordIndex)
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

export function getWordContext(words, index, contextSize = 5) {
  const start = Math.max(0, index - contextSize)
  const end = Math.min(words.length - 1, index + contextSize)

  return words.slice(start, end).join('')
}