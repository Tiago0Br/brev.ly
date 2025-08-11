import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import { eq } from 'drizzle-orm'

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
    throw new Error('This shortened URL already exists')
  }

  await db.insert(schema.links).values({
    originalUrl,
    shortenedUrl,
  })
}
