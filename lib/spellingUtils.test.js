import {expect, test, describe} from 'vitest'
import {loadDictionary, checkSpelling, getWordContext, createSpellChecker, trimPunctuation} from './spellingUtils'

describe('spellingUtils', () => {
  describe('loadDictionary', () => {
    test('loads dictionary from file', () => {
      const dictionary = loadDictionary('./lib/fixtures/test-dictionary.txt')
      expect(dictionary.size).toBe(3)
      expect(dictionary.has('foo')).toBe(true)
      expect(dictionary.has('bar')).toBe(true)
      expect(dictionary.has('baz')).toBe(true)
    })
  })
  describe('trimPunctuation', () => {
    test('trims punctuation from start and end of word', () => {
      expect(trimPunctuation('foo')).toBe('foo')
      expect(trimPunctuation('foo.')).toBe('foo')
      expect(trimPunctuation('.foo')).toBe('foo')
      expect(trimPunctuation('foo,')).toBe('foo')
      expect(trimPunctuation(',foo')).toBe('foo')
      expect(trimPunctuation('foo!')).toBe('foo')
      expect(trimPunctuation('!foo')).toBe('foo')
      expect(trimPunctuation('foo?')).toBe('foo')
      expect(trimPunctuation('?foo')).toBe('foo')
      expect(trimPunctuation('\'foo')).toBe('foo')
    })
  })
  describe('getWordContext', () => {
    test('returns context for word in list', () => {
      const words = ['foo', 'bar', 'baz']
      const context = getWordContext(words, 1)
      expect(context).toStrictEqual({
        left: 'foo',
        word: 'bar',
        right: 'baz'
      })
    })
  })
  describe('checkSpelling', () => {
    test('returns errors for misspelled words', () => {
      const dictionary = loadDictionary('./lib/fixtures/test-dictionary.txt')
      const searcher = {
        search: () => ['bar', 'baz']
      }
      const errors = checkSpelling('foo bart baz', dictionary, searcher)
      expect(errors.length).toBe(1)
      expect(errors[0].word).toBe('bart')
      expect(errors[0].line).toBe(1)
      expect(errors[0].column).toBe(5)
      expect(errors[0].context).toStrictEqual({
        left: 'foo',
        word: 'bart',
        right: 'baz'
      })
      expect(errors[0].suggestions).toEqual(['bar', 'baz'])
    })
    test('ignores proper nouns', () => {
      const dictionary = loadDictionary('./lib/fixtures/test-dictionary.txt')
      const searcher = {
        search: () => ['bar', 'baz']
      }
      const errors = checkSpelling('Foo bar baz', dictionary, searcher)
      expect(errors.length).toBe(0)
    })
  })
  describe('createSpellChecker', () => {
    test('returns spell checker', () => {
      const spellChecker = createSpellChecker('./lib/fixtures/test-dictionary.txt')
      expect(spellChecker.dictionaryWordCount).toBe(3)
      expect(spellChecker.checkSpelling).toBeInstanceOf(Function)
    })
  })
})