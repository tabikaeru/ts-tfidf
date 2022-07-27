# ts-tfidf
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) 

TypeScript tfidf library.

# Usage
```jsx
import { calculateTfIdf } from 'ts-tfidf'

const texts = ['This is the first document.', 'This document is the second document.', 'And this is the third one.', 'Is this the first document?']

const result = calculateTfIdf({texts: texts})
console.log('result', result)
```
