const languages = {};
const languagesReverse = {};

function NameStringException() {
  const error = new Error("Name of language must be string");
  error.code = 1;
  return error
}

function ExampleStringException() {
  const error = new Error("Example text for language must be string");
  error.code = 2;
  return error
}

function NameAlreadyUsedException() {
  const error = new Error("Name of language must be unique, not previously used");
  error.code = 3;
  return error
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

  delete baseSyllables['']

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
  translate
}