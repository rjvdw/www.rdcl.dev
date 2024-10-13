import { describe, expect, test } from 'vitest'
import { Fraction } from './fraction'

describe('Fraction', () => {
  test('Fractions are simplified', () => {
    expect(frac(1, 2).toString()).toBe('1 / 2')
    expect(frac(2, 4).toString()).toBe('1 / 2')
    expect(frac(-1, 2).toString()).toBe('-1 / 2')
    expect(frac(1, -2).toString()).toBe('-1 / 2')
    expect(frac(1, 1).toString()).toBe('1')
    expect(frac(2, 2).toString()).toBe('1')
    expect(frac(2, 1).toString()).toBe('2')
    expect(frac(-1, 1).toString()).toBe('-1')
    expect(frac(1, -1).toString()).toBe('-1')
    expect(frac(1).toString()).toBe('1')
    expect(frac(2).toString()).toBe('2')
    expect(frac(-1).toString()).toBe('-1')
  })

  test('Fractions can be checked for equality', () => {
    expect(frac(1, 2).equals(frac(2, 4))).toBe(true)
    expect(frac(1, 2).equals(frac(1, 4))).toBe(false)
  })

  test('Fractions can be compared', () => {
    expect(frac(1, 2).compareTo(frac(1, 4))).toBeGreaterThan(0)
    expect(frac(1, 2).compareTo(frac(2, 4))).toBe(0)
    expect(frac(1, 2).compareTo(frac(3, 4))).toBeLessThan(0)
  })

  test('Fractions can be added', () => {
    expect(frac(1, 2).add(frac(1, 3)).toString()).toBe('5 / 6')
    expect(frac(3, 8).add(frac(2, 8)).toString()).toBe('5 / 8')
    expect(frac(1, 2).add(2).toString()).toBe('5 / 2')
  })

  test('Fractions can be subtracted', () => {
    expect(frac(1, 2).subtract(frac(1, 3)).toString()).toBe('1 / 6')
    expect(frac(3, 8).subtract(frac(2, 8)).toString()).toBe('1 / 8')
    expect(frac(1, 2).subtract(2).toString()).toBe('-3 / 2')
  })

  test('Fractions can be multiplied', () => {
    expect(frac(1, 2).multiply(frac(1, 3)).toString()).toBe('1 / 6')
    expect(frac(3, 8).multiply(frac(2, 8)).toString()).toBe('3 / 32')
    expect(frac(1, 2).multiply(2).toString()).toBe('1')
  })

  test('Fractions can be divided', () => {
    expect(frac(1, 2).divide(frac(1, 3)).toString()).toBe('3 / 2')
    expect(frac(3, 8).divide(frac(2, 8)).toString()).toBe('3 / 2')
    expect(frac(1, 2).divide(2).toString()).toBe('1 / 4')
  })

  test('Invalid numerator or denominator lead to an error', () => {
    expect(() => frac(1.2, 2)).toThrowError(
      'Numerator and denominator must both be integer values',
    )
    expect(() => frac(1, 1.2)).toThrowError(
      'Numerator and denominator must both be integer values',
    )
    expect(() => frac(1.2, 1.2)).toThrowError(
      'Numerator and denominator must both be integer values',
    )
  })

  test('Fractions can be parsed from a string', () => {
    expect(Fraction.parse('2/3').toString()).toBe('2 / 3')
    expect(Fraction.parse(' 2 / 3 ').toString()).toBe('2 / 3')
    expect(Fraction.parse('-2/3').toString()).toBe('-2 / 3')
    expect(Fraction.parse('2/-3').toString()).toBe('-2 / 3')
    expect(Fraction.parse('2').toString()).toBe('2')
    expect(Fraction.parse('-2').toString()).toBe('-2')

    expect(() => Fraction.parse('1/2/3')).toThrowError('Invalid input: 1/2/3')
  })
})

function frac(a: number, b?: number): Fraction {
  if (b === undefined) {
    return new Fraction(a)
  }
  return new Fraction(a, b)
}
