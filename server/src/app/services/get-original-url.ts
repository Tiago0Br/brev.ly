import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import { makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { LinkNotFound } from '../errors/link-not-found'

interface GetOriginalUrlProps {
  shortenedUrl: string
}

export async function getOriginalUrl({ shortenedUrl }: GetOriginalUrlProps) {
  const [link] = await db
    .select({
      originalUrl: schema.links.originalUrl,
      accessCount: schema.links.accessCount,
    })
    .from(schema.links)
    .where(eq(schema.links.shortenedUrl, shortenedUrl))
    .limit(1)

  if (!link) {
    return makeLeft(LinkNotFound.throw())
  }

  await db
    .update(schema.links)
    .set({ accessCount: link.accessCount + 1 })
    .where(eq(schema.links.shortenedUrl, shortenedUrl))

  return makeRight({ originalUrl: link.originalUrl })
}
