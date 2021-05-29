# FakeLang

[![NPM version](https://img.shields.io/npm/v/fakelang.svg?style=flat)](https://www.npmjs.com/package/fakelang) [![NPM downloads](https://img.shields.io/npm/dm/fakelang.svg?style=flat)](https://npmjs.org/package/fakelang)

FakeLang enables programs to generate fake languages and translate to them as well.

## Why?

I wrote this with the idea of translating text to languages like Elvish in D&D. The purpose of translating in this situation is to obscure text from the characters that don't speak or read the language.

## Usage Example

```
const { createLanguageFromPreset, createLanguageFromExample, translate } = require("fakelang");

createLanguageFromPreset("Engish", 101);
console.log(translate("Engish", "I have red walls."));
console.log(translate("Engish", "I have red walls."));
console.log(translate("Engish", "I like red curtains."));

const lorem = "Lo-rem ip-sum dol-or sit a-met, con-sec-tet-ur ad-i-pi-scing e-lit."

createLanguageFromExample("Loremese", lorem);
console.log(translate("Loremese", "I have red walls."));
console.log(translate("Loremese", "I have red walls."));
console.log(translate("Loremese", "I like red curtains."));
```