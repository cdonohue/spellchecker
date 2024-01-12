# spellchecker
A spellchecker written for the command line, using nodejs

## Features
- [x] Checks spelling of a file based on a dictionary
- [x] Outputs a list of misspelled words, including line number and column number
- [x] Shows the inline context of each misspelled word
- [x] Outputs a list of suggested words for each misspelled word
- [x] Handles proper nouns and capitalized words
- [ ] Handles hypens and apostrophes

## Installation
> Requires nodejs version 20.0.0 or higher
```bash
  npm install
```

## Usage
```bash
  ./spellchecker.js <path to dictionary> <path to file to check>
```

## Example
```bash
  ./spellchecker.js ./dictionary.txt ./test.txt
```

## Tests
```bash
  npm test
```
