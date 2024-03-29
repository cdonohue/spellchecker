import fs from 'fs'
import { Searcher } from 'fast-fuzzy'

export function loadDictionary(path) {
  return new Set(fs.readFileSync(path, 'utf8').split(/\r?\n/))
}

export function createSpellChecker(dictionaryPath) {
  const dictionary = loadDictionary(dictionaryPath)
  const searcher = new Searcher([...dictionary], {
    threshold: 0.85,
  })

  return {
    dictionaryWordCount: dictionary.size,
    checkSpelling(text) {
      return checkSpelling(text, dictionary, searcher)
    }
  }
}

export function checkSpelling(text, dictionary, searcher) {
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
          context: getWordContext(words, wordIndex),
          suggestions: searcher.search(trimmedWord)
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

export function getWordContext(words, index, contextSize = 2) {
  const start = Math.max(0, index - contextSize)
  const end = Math.min(words.length, index + contextSize + 1)

  // return left sub array + word + right sub array
  return {
    left: words.slice(start, index).join('').trim(),
    word: words[index],
    right: words.slice(index + 1, end).join('').trim()
  }
}