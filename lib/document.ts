export const DEFAULT_STOP_WORDS = [
  'me',
  'my',
  'myself',
  'we',
  'our',
  'ours',
  'ourselves',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves',
  'he',
  'him',
  'his',
  'himself',
  'she',
  'her',
  'hers',
  'herself',
  'it',
  'its',
  'itself',
  'they',
  'them',
  'their',
  'theirs',
  'themselves',
  'what',
  'which',
  'who',
  'whom',
  'this',
  'that',
  'these',
  'those',
  'am',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'having',
  'do',
  'does',
  'did',
  'doing',
  'an',
  'the',
  'and',
  'but',
  'if',
  'or',
  'because',
  'as',
  'until',
  'while',
  'of',
  'at',
  'by',
  'for',
  'with',
  'about',
  'against',
  'between',
  'into',
  'through',
  'during',
  'before',
  'after',
  'above',
  'below',
  'to',
  'from',
  'up',
  'down',
  'in',
  'out',
  'on',
  'off',
  'over',
  'under',
  'again',
  'further',
  'then',
  'once',
  'here',
  'there',
  'when',
  'where',
  'why',
  'how',
  'all',
  'any',
  'both',
  'each',
  'few',
  'more',
  'most',
  'other',
  'some',
  'such',
  'no',
  'nor',
  'not',
  'only',
  'own',
  'same',
  'so',
  'than',
  'too',
  'very',
  'can',
  'will',
  'just',
  'don',
  'could',
  'should',
  'would',
  'now',
  'll',
  're',
  've',
  'aren',
  'couldn',
  'didn',
  'doesn',
  'hadn',
  'hasn',
  'haven',
  'isn',
  'mustn',
  'needn',
  'shouldn',
  'wasn',
  'weren',
  'won',
  'wouldn',
]

const textToWord = (text: string) => {
  if (!text) return ['']
  const regexpText = text.match(/[a-zA-ZÀ-ÖØ-öø-ÿ]+/g)
  if (!regexpText) return ['']
  return regexpText
    ? /* eslint-disable indent */
      regexpText
        .filter((word) => {
          if (word.length < 2 || word.match(/^\d/)) {
            return false
          }
          return true
        })
        .map((word) => word.toLowerCase())
    : null
  /* eslint-enable indent */
}

const calculateWordsFrequency = (words: string[]) => {
  const wordFrequency = new Map<string, number>()
  words.forEach((word) => {
    if (wordFrequency.has(word)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      wordFrequency.set(word, wordFrequency.get(word)! + 1)
    } else {
      wordFrequency.set(word, 1)
    }
  })
  return wordFrequency
}

export type Document = {
  text: string
  words: string[]
  termFrequencies: Map<string, number>
}

export const buildDocument = (text: string) => {
  const words = textToWord(text) ?? []
  const termFrequencies = calculateWordsFrequency(words)
  const newDocument: Document = {
    text,
    words,
    termFrequencies,
  }
  return newDocument
}
