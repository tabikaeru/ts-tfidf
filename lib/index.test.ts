import { test, expect, describe } from 'vitest'
import { calculateTfIdf } from './index'

const normalTexts = ['This is the first document.', 'This document is the second document.', 'And this is the third one.', 'Is this the first document?']
describe('In terms of calculateTfIdf', () => {
  test('normal test ', () => {
    expect(calculateTfIdf({ texts: normalTexts })[0]?.get('first')).toBe(0.5622854164212566)
    expect(calculateTfIdf({ texts: normalTexts, isNormalization: false })[0]?.get('first')).toBe(1.2720773868788637)
    expect(calculateTfIdf({ texts: normalTexts, isUseDefaultStopWords: false })[0]?.get('first')).toBe(0.21193053665426043)
    expect(calculateTfIdf({ texts: normalTexts, isNormalization: false, isUseDefaultStopWords: false })[0]?.get('first')).toBe(1.8635596880815901)
  })
  const emptyString = ['', '']
  test('empty string  test ', () => {
    expect(calculateTfIdf({ texts: emptyString })[0]?.get('')).toBe(NaN)
    expect(calculateTfIdf({ texts: emptyString, isNormalization: false })[0]?.get('')).toBe(0)
    expect(calculateTfIdf({ texts: emptyString, isUseDefaultStopWords: false })[0]?.get('')).toBe(NaN)
    expect(calculateTfIdf({ texts: emptyString, isNormalization: false, isUseDefaultStopWords: false })[0]?.get('')).toBe(0)
  })

  const symbolString = ['?', '!']
  test('symbol string  test ', () => {
    expect(calculateTfIdf({ texts: symbolString })[0]?.get('')).toBe(NaN)
    expect(calculateTfIdf({ texts: symbolString, isNormalization: false })[0]?.get('')).toBe(0)
    expect(calculateTfIdf({ texts: symbolString, isUseDefaultStopWords: false })[0]?.get('')).toBe(NaN)
    expect(calculateTfIdf({ texts: symbolString, isNormalization: false, isUseDefaultStopWords: false })[0]?.get('')).toBe(0)
  })

  const numberString = ['111', '2']
  test('number string  test ', () => {
    expect(calculateTfIdf({ texts: numberString })[0]?.get('')).toBe(NaN)
    expect(calculateTfIdf({ texts: numberString, isNormalization: false })[0]?.get('')).toBe(0)
    expect(calculateTfIdf({ texts: numberString, isUseDefaultStopWords: false })[0]?.get('')).toBe(NaN)
    expect(calculateTfIdf({ texts: numberString, isNormalization: false, isUseDefaultStopWords: false })[0]?.get('')).toBe(0)
  })
})
