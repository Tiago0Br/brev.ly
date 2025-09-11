import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import { makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { LinkAlreadyExists } from '../errors/link-already-exists'

interface CreateLinkProps {
  originalUrl: string
  shortenedUrl: string
}

export async function createLink({ originalUrl, shortenedUrl }: CreateLinkProps) {
  const shortenedUrlAlreadyExists = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortenedUrl, shortenedUrl))

  if (shortenedUrlAlreadyExists.length !== 0) {
    return makeLeft(LinkAlreadyExists.throw())
  }

  await db.insert(schema.links).values({
    originalUrl,
    shortenedUrl,
  })

  return makeRight(null)
}
