import { createLink } from '@/app/services/create-link'
import { isRight } from '@/shared/either'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Create Link Service', () => {
  it('should be able to create a link', async () => {
    const sut = await createLink({
      originalUrl: 'https://example.com',
      shortenedUrl: `example_${randomUUID()}`,
    })

    expect(isRight(sut)).toBe(true)
  })
})
