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

const longExampleText = `Hong Kong Phoo-ey, num-ber one su-per guy.
 Hong Kong Phoo-ey, quick-er than the hu-man eye. He’s got sty-le, a
 groo-vy sty-le, and a car that just won’t stop. When the go-ing gets
 tough, he’s real-ly rough, with a Hong Kong Phoo-ey chop (Hi-Ya!).
 Hong Kong Phoo-ey, num-ber one su-per guy. Hong Kong Phoo-ey, quick-er
 than the hu-man eye. Hong Kong Phoo-ey, he’s fan-rif-fic! One for all
 and all for one, Mus-ke-hounds are al-ways rea-dy. One for all and all
 for one, help-ing eve-ry-bo-dy. One for all and all for one, it’s a
 pret-ty stor-y. Shar-ing eve-ry-thing with fun, that’s the way to be.
 One for all and all for one, Mus-ke-hounds are al-ways rea-dy. One for
 all and all for one, help-ing eve-ry-bo-dy. One for all and all for one,
 can sound pret-ty cor-ny. If you-’ve got a prob-lem chum, think how it
 could be. Knight Ri-der, a sha-dow-y flight in-to the dan-ger-ous world
 of a man who does not ex-ist. Mi-chael Knight, a young lo-ner on a
 cru-sade to cham-pi-on the cause of the in-no-cent, the help-less in
 a world of crim-in-als who op-er-ate ab-ove the law.`

engish = createLanguageFromExample("Engish", longExampleText);
console.log(languages)
console.log(languagesReverse)

textToTranslate = "I love my homies. I love to kiss them to sleep."
console.log(translate('Engish', textToTranslate))