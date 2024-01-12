# spellchecker
A spellchecker written for the command line, using nodejs
![CleanShot 2024-01-10 at 21 44 30](https://github.com/cdonohue/spellchecker/assets/1928846/ab389a09-98b6-4bfb-b8b7-fb716fa9405f)

![CleanShot 2024-01-10 at 21 47 31@2x](https://github.com/cdonohue/spellchecker/assets/1928846/4b214430-c59b-4959-84cb-e07d9b3d6371)


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
