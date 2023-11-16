import { describe, expect, test } from 'vitest'
import { unauthorized } from './responses'

describe('unauthorized', () => {
  test('returns a 401 response', () => {
    const response = unauthorized()
    expect(response.status).toBe(401)
  })
})
