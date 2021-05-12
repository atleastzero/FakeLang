const fs = require('fs');
const path = require('path');

const languages = {};
const languagesReverse = {};

function NameStringException() {
  const error = new Error("Name of language must be string");
  error.code = 1;
  return error;
}

function ExampleStringException() {
  const error = new Error("Example text for language must be string");
  error.code = 2;
  return error;
}

function NameAlreadyUsedException() {
  const error = new Error("Name of language must be unique, not previously used");
  error.code = 3;
  return error;
}

function InvalidPresetException() {
  const error = new Error("At this time, preset must be 101");
  error.code = 4;
  return error;
}

const createLanguageFromPreset = (languageName, preset=101) => {
  if (typeof languageName !== 'string') {
    throw new NameStringException();
  }
  if (preset !== 101) {
    throw new InvalidPresetException();
  }

  if (preset === 101) {
    text = fs.readFileSync(path.join(__dirname, 'sample-texts/english1.txt'), 'utf8', (err, data) => {
      if (err) {
        throw new Error(err);
      }
    });

    createLanguageFromExample(languageName, text);
  }
}

const createLanguageFromExample = (languageName, exampleText) => {
  if (typeof languageName !== 'string') {
    throw new NameStringException();
  }
  if (typeof exampleText !== 'string') {
    throw new ExampleStringException();
  }
  if (languageName in languages) {
    throw new NameAlreadyUsedException();
  }

  baseSyllables = {};

  words = exampleText.split(' ')
  for (word in words) {
    if (words[word].includes('-')) {
      syllables = words[word].split('-');
      for (syllable in syllables) {
        totalCount = baseSyllables[syllables[syllable]] || 0;
        baseSyllables[syllables[syllable]] = totalCount + 1;
      }
    }
    else {
      totalCount = baseSyllables[words[word]] || 0;
      baseSyllables[words[word]] = totalCount + 1;
    }
  }

  baseSyllables[''] = 0

  languages[languageName] = [baseSyllables, {}];
  languagesReverse[languageName] = {};
};

const translate = (languageName, textToTranslate) => {
  let translatedText = "";

  words = textToTranslate.split(' ')
  for (word in words) {
    if (words[word] in languages[languageName][1]) {
      translatedText += languages[languageName][1][words[word]] + " ";
    } else {
      generateNewRandomWord(languageName, words[word]);
      translatedText += languages[languageName][1][words[word]] + " ";
    }
  }

  return translatedText;
};

const generateNewRandomWord = (languageName, word) => {
  translatedWord = "";
  baseSyllables = languages[languageName][0];
  totalOccurrences = 0;
  for (syllable in baseSyllables) {
    totalOccurrences += baseSyllables[syllable];
  }
  while (translatedWord in languagesReverse[languageName]) {
    translatedWord += generateNewRandomSyllable(baseSyllables, totalOccurrences);
  }
  languages[languageName][1][word] = translatedWord;
  languagesReverse[languageName][translatedWord] = word;
};

const generateNewRandomSyllable = (baseSyllables, totalOccurrences) => {
  syllableNum = Math.floor(Math.random() * totalOccurrences);
  for (syllable in baseSyllables) {
    syllableNum -= baseSyllables[syllable];
    if (syllableNum < 0) {
      return syllable;
    }
  }
};

module.exports = {
  createLanguageFromExample,
  createLanguageFromPreset,
  translate
}