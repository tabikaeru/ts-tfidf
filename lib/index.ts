import { Document, buildDocument, DEFAULT_STOP_WORDS } from './document'

//   - K1 modifies term frequency (higher values increase the influence)
//   - b modifies document length (between 0 and 1; 1 means that long documents are repetitive and 0 means they are multi-topic)

const K1 = 2.0
const B = 0.75

const calculateCollectionFrequencies = (documents: Map<string, Document>, isUseDefaultStopWords: boolean, inputStopWords: string[]) => {
  const stopWords = isUseDefaultStopWords ? [...inputStopWords, ...DEFAULT_STOP_WORDS] : inputStopWords
  const collectionFrequencies = new Map<string, number>()
  documents.forEach((document) => {
    Array.from(document.termFrequencies.keys())
      .filter((t) => !stopWords.includes(t))
      .forEach((term) => {
        if (collectionFrequencies.has(term)) {
          const n = collectionFrequencies.get(term)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          collectionFrequencies.set(term, n! + 1)
        } else {
          collectionFrequencies.set(term, 1)
        }
      })
  })
  return collectionFrequencies
}

const calculateCollectionFrequencyWeight = (documents: Map<string, Document>, isUseDefaultStopWords: boolean, stopWords: string[]) => {
  const collectionFrequencyWeights = new Map<string, number>()
  const collectionFrequency = calculateCollectionFrequencies(documents, isUseDefaultStopWords, stopWords)
  const N = collectionFrequency.size

  collectionFrequency.forEach((n, term) => {
    collectionFrequencyWeights.set(term, Math.log(N + 1) - Math.log(n))
  })
  return collectionFrequencyWeights
}

type calculateTfIdfProps = { texts: string[]; isUseDefaultStopWords?: boolean; isNormalization?: boolean; stopWords?: string[]; k1?: number; b?: number }

export const calculateTfIdf = ({ texts, isNormalization = true, isUseDefaultStopWords = true, stopWords = [], k1 = K1, b = B }: calculateTfIdfProps) => {
  const documents = new Map<string, Document>()
  for (let i = 0; i < texts.length; i++) {
    documents.set(i.toString(), buildDocument(texts[i]))
  }
  const documentVectors: Map<string, number>[] = []

  const collectionFrequencyWeights = calculateCollectionFrequencyWeight(documents, isUseDefaultStopWords, stopWords)

  let totalLength = 0
  documents.forEach((document) => {
    totalLength += document.words.length
  })
  const avgLength = totalLength / documents.size

  documents.forEach((document) => {
    const vector = new Map<string, number>()
    const ndl = documents.size / avgLength
    collectionFrequencyWeights.forEach((idf, term) => {
      const tf = document.termFrequencies.get(term) ?? null
      const cw = tf ? (idf * tf * (k1 + 1)) / (k1 * (1 - b + b * ndl) + tf) : 0.0
      vector.set(term, cw)
    })
    documentVectors.push(vector)
  })

  if (!isNormalization) return documentVectors

  const documentNormalizedVectors: Map<string, number>[] = []
  documentVectors.forEach((documentVector) => {
    let l2 = 0
    const vector = new Map<string, number>()
    documentVector.forEach((value) => {
      l2 += value * value
    })
    documentVector.forEach((value, term) => {
      vector.set(term, value / l2)
    })

    documentNormalizedVectors.push(vector)
  })

  return documentNormalizedVectors
}
